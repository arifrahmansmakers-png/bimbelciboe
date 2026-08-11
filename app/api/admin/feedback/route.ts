import {NextRequest,NextResponse} from 'next/server';
import {getAuth} from 'firebase-admin/auth';
import {getAdminDb} from '@/lib/firebaseAdmin';

export const dynamic='force-dynamic';

const failed=(message:string,status=400)=>NextResponse.json({success:false,message},{status});

async function verifyAdmin(req:NextRequest){

const authHeader=req.headers.get('authorization');

if(!authHeader?.startsWith('Bearer '))return null;

const token=authHeader.substring(7);

try{

const decoded=await getAuth().verifyIdToken(token);

const adminDb=getAdminDb();

const userDoc=await adminDb.collection('users').doc(decoded.uid).get();

if(!userDoc.exists)return null;

const user=userDoc.data();

if(user?.role!=='admin')return null;

return decoded;

}catch{

return null;

}

}

export async function GET(req:NextRequest){

try{

const admin=await verifyAdmin(req);

if(!admin)return failed('Unauthorized',401);

const adminDb=getAdminDb();

const snapshot=await adminDb.collection('feedbacks').orderBy('createdAt','desc').get();

const data=snapshot.docs.map(doc=>{

const d=doc.data();

return{

id:doc.id,

uid:d.uid??null,

nama:d.nama??'',

email:d.email??'',

category:d.category??'',

title:d.title??'',

message:d.message??'',

rating:Number(d.rating??0),

status:d.status??'pending',

adminReply:d.adminReply??null,

repliedBy:d.repliedBy??null,

repliedAt:d.repliedAt?.toDate?.()?.toISOString?.()??d.repliedAt??null,

createdAt:d.createdAt?.toDate?.()?.toISOString?.()??d.createdAt??null,

updatedAt:d.updatedAt?.toDate?.()?.toISOString?.()??d.updatedAt??null

};

});

return NextResponse.json({

success:true,

total:data.length,

data

});

}catch(error:any){

console.error(error);

return NextResponse.json({

success:false,

message:error.message

},{status:500});

}

}