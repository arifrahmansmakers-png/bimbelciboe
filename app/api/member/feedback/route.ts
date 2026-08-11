import {NextRequest,NextResponse} from 'next/server';
import {FieldValue} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';
import {getAdminDb} from '@/lib/firebaseAdmin';

export const dynamic='force-dynamic';

const error=(message:string,status=400)=>NextResponse.json({success:false,message},{status});

async function getUser(req:NextRequest){
const authHeader=req.headers.get('authorization');
if(!authHeader?.startsWith('Bearer '))return null;
const token=authHeader.substring(7);
try{
return await getAuth().verifyIdToken(token);
}catch{
return null;
}
}

export async function GET(req:NextRequest){

try{

const user=await getUser(req);

if(!user)return error('Unauthorized',401);

const adminDb=getAdminDb();

const snap=await adminDb.collection('feedbacks')
.where('uid','==',user.uid)
.orderBy('createdAt','desc')
.get();

const data=snap.docs.map(doc=>{

const d=doc.data();

return{
id:doc.id,
category:d.category,
title:d.title,
message:d.message,
rating:d.rating??0,
status:d.status,
adminReply:d.adminReply??null,
createdAt:d.createdAt?.toDate?.()?.toISOString()??null
};

});

return NextResponse.json({
success:true,
data
});

}catch(err:any){

console.error(err);

return NextResponse.json({
success:false,
message:err.message
},{status:500});

}

}

export async function POST(req:NextRequest){

try{

const user=await getUser(req);

if(!user)return error('Unauthorized',401);

const body=await req.json();

const{
category,
title,
message,
rating
}=body;

if(!category)return error('Kategori wajib dipilih.');

if(!title?.trim())return error('Judul wajib diisi.');

if(title.trim().length<5)return error('Judul minimal 5 karakter.');

if(title.trim().length>120)return error('Judul maksimal 120 karakter.');

if(!message?.trim())return error('Pesan wajib diisi.');

if(message.trim().length<10)return error('Pesan terlalu pendek.');

if(message.trim().length>5000)return error('Pesan terlalu panjang.');

const nilaiRating=Number(rating??0);

if(nilaiRating<0||nilaiRating>5)return error('Rating tidak valid.');

const adminDb=getAdminDb();

await adminDb.collection('feedbacks').add({

uid:user.uid,

nama:user.name??'',

email:user.email??'',

category,

title:title.trim(),

message:message.trim(),

rating:nilaiRating,

status:'pending',

adminReply:null,

repliedBy:null,

repliedAt:null,

createdAt:FieldValue.serverTimestamp(),

updatedAt:FieldValue.serverTimestamp()

});

return NextResponse.json({
success:true,
message:'Feedback berhasil dikirim.'
});

}catch(err:any){

console.error(err);

return NextResponse.json({
success:false,
message:err.message
},{status:500});

}

}