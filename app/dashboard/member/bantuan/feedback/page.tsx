'use client';
import {useEffect,useState} from 'react';

interface Feedback{
id:string;
category:string;
title:string;
message:string;
rating:number;
status:'pending'|'process'|'resolved'|'rejected';
adminReply:string|null;
createdAt:string;
}

const categories=[
{value:'general',label:'General Question'},
{value:'suggestion',label:'Suggestion'},
{value:'feature',label:'Feature Request'},
{value:'bug',label:'Bug Report'},
{value:'complaint',label:'Complaint'},
{value:'other',label:'Other'}
];

export default function FeedbackPage(){
const[loading,setLoading]=useState(true);
const[submitting,setSubmitting]=useState(false);
const[feedbacks,setFeedbacks]=useState<Feedback[]>([]);
const[form,setForm]=useState({category:'feature',title:'',message:'',rating:0});
const[hover,setHover]=useState(0);
const[success,setSuccess]=useState('');
const[error,setError]=useState('');

const loadFeedback=async()=>{
try{
setLoading(true);
const res=await fetch('/api/member/feedback',{cache:'no-store'});
const json=await res.json();
if(json.success)setFeedbacks(json.data??[]);
}catch(err){
console.error(err);
}finally{
setLoading(false);
}
};

useEffect(()=>{
loadFeedback();
},[]);

const handleSubmit=async(e:React.FormEvent)=>{
e.preventDefault();
if(submitting)return;
setSubmitting(true);
setSuccess('');
setError('');
try{
const res=await fetch('/api/member/feedback',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(form)
});
const json=await res.json();
if(!json.success){
setError(json.message);
setSubmitting(false);
return;
}
setSuccess('Feedback berhasil dikirim.');
setForm({category:'feature',title:'',message:'',rating:0});
await loadFeedback();
}catch(err){
console.error(err);
setError('Terjadi kesalahan.');
}
setSubmitting(false);
};

const badge=(status:string)=>{
switch(status){
case'pending':return'bg-yellow-100 text-yellow-700';
case'process':return'bg-blue-100 text-blue-700';
case'resolved':return'bg-green-100 text-green-700';
case'rejected':return'bg-red-100 text-red-700';
default:return'bg-slate-100 text-slate-700';
}
};

const badgeText=(status:string)=>{
switch(status){
case'pending':return'Menunggu';
case'process':return'Diproses';
case'resolved':return'Selesai';
case'rejected':return'Ditolak';
default:return status;
}
};

return(
<main className="max-w-6xl mx-auto p-6">
<div className="mb-8">
<h1 className="text-3xl font-bold">Feedback</h1>
<p className="text-slate-500 mt-2">Sampaikan saran,kritik,laporan bug maupun ide pengembangan CiboeEdu.</p>
</div>

<div className="grid lg:grid-cols-5 gap-8">
</div>
<div className="lg:col-span-2">
<div className="rounded-3xl border bg-white shadow p-6">
<h2 className="text-xl font-bold mb-6">Kirim Feedback</h2>

<form onSubmit={handleSubmit} className="space-y-5">

<div>
<label className="block mb-2 text-sm font-semibold">Kategori</label>
<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100">
{categories.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
</select>
</div>

<div>
<label className="block mb-2 text-sm font-semibold">Judul</label>
<input type="text" required maxLength={120} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Masukkan judul feedback" className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100"/>
</div>

<div>
<label className="block mb-2 text-sm font-semibold">Pesan</label>
<textarea rows={6} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tuliskan saran,kritik ataupun laporan bug..." className="w-full rounded-xl border px-4 py-3 outline-none resize-none focus:ring-4 focus:ring-blue-100"/>
</div>

<div>
<label className="block mb-3 text-sm font-semibold">Rating (Opsional)</label>
<div className="flex gap-1">
{[1,2,3,4,5].map(star=>(
<button key={star} type="button" onMouseEnter={()=>setHover(star)} onMouseLeave={()=>setHover(0)} onClick={()=>setForm({...form,rating:star})} className={`text-4xl transition ${(hover||form.rating)>=star?'text-yellow-400':'text-slate-300'}`}>★</button>
))}
</div>
<p className="text-xs text-slate-500 mt-2">Rating membantu kami meningkatkan kualitas layanan.</p>
</div>

{success&&<div className="rounded-xl border border-green-200 bg-green-50 p-3 text-green-700">{success}</div>}
{error&&<div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}

<button disabled={submitting} className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 disabled:bg-slate-400">{submitting?'Mengirim...':'Kirim Feedback'}</button>

</form>
</div>
</div>

<div className="lg:col-span-3">
<div className="rounded-3xl border bg-white shadow">

<div className="border-b p-6">
<h2 className="text-xl font-bold">Riwayat Feedback</h2>
<p className="text-slate-500 mt-1">Seluruh feedback yang pernah Anda kirim.</p>
</div>

<div className="p-6 space-y-5">

{loading&&<div className="text-center py-20 text-slate-500">Memuat feedback...</div>}

{!loading&&feedbacks.length===0&&(
<div className="text-center py-20">
<div className="text-6xl mb-5">💬</div>
<h3 className="text-xl font-bold">Belum Ada Feedback</h3>
<p className="text-slate-500 mt-2">Silakan kirim feedback pertama Anda.</p>
</div>
)}

{!loading&&feedbacks.map(item=>(
<div key={item.id} className="rounded-2xl border p-5">

<div className="flex justify-between items-start gap-4">
<div>
<h3 className="font-bold text-lg">{item.title}</h3>
<div className="flex flex-wrap gap-2 mt-2">
<span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">{categories.find(x=>x.value===item.category)?.label}</span>
<span className={`px-3 py-1 rounded-full text-sm ${badge(item.status)}`}>{badgeText(item.status)}</span>
</div>
</div>

<div className="text-sm text-slate-500 whitespace-nowrap">
{new Date(item.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})}
</div>
</div>

<p className="mt-5 text-slate-700 leading-7 whitespace-pre-wrap">{item.message}</p>

{item.rating>0&&(
<div className="flex gap-1 mt-4">
{[1,2,3,4,5].map(star=>(
<span key={star} className={`text-2xl ${item.rating>=star?'text-yellow-400':'text-slate-300'}`}>★</span>
))}
</div>
)}

{item.adminReply&&(
<div className="mt-5 rounded-2xl bg-blue-50 border border-blue-200 p-5">
<div className="font-bold text-blue-800 mb-2">Balasan Admin</div>
<p className="text-blue-900 leading-7 whitespace-pre-wrap">{item.adminReply}</p>
</div>
)}

</div>
))}

</div>

<div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white p-6 shadow-xl">
<h2 className="text-2xl font-bold">Kami Mendengarkan Masukan Anda</h2>
<p className="mt-3 text-blue-100 leading-7">Semua saran,kritik,laporan bug maupun ide pengembangan akan dibaca oleh tim CiboeEdu.Feedback terbaik akan menjadi prioritas dalam pengembangan fitur berikutnya.</p>
<div className="grid md:grid-cols-3 gap-4 mt-6">
<div className="rounded-2xl bg-white/10 backdrop-blur p-4">
<div className="text-3xl">💡</div>
<div className="font-semibold mt-3">Ide Baru</div>
<p className="text-sm text-blue-100 mt-2">Usulkan fitur yang dapat membantu proses belajar.</p>
</div>
<div className="rounded-2xl bg-white/10 backdrop-blur p-4">
<div className="text-3xl">🐞</div>
<div className="font-semibold mt-3">Laporan Bug</div>
<p className="text-sm text-blue-100 mt-2">Laporkan apabila menemukan error atau masalah pada sistem.</p>
</div>
<div className="rounded-2xl bg-white/10 backdrop-blur p-4">
<div className="text-3xl">❤️</div>
<div className="font-semibold mt-3">Saran</div>
<p className="text-sm text-blue-100 mt-2">Masukan dari Anda membantu CiboeEdu menjadi lebih baik.</p>
</div>
</div>
</div>
</div>
</div>
</main>
);
}