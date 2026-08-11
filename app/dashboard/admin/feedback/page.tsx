'use client';
import {useEffect,useMemo,useState} from 'react';

interface Feedback{
id:string;
uid:string;
nama:string;
email:string;
category:string;
title:string;
message:string;
rating:number;
status:string;
adminReply:string|null;
repliedBy:string|null;
repliedAt:string|null;
createdAt:string;
updatedAt:string;
}

const categories=[
{value:'all',label:'Semua Kategori'},
{value:'general',label:'General Question'},
{value:'suggestion',label:'Suggestion'},
{value:'feature',label:'Feature Request'},
{value:'bug',label:'Bug Report'},
{value:'complaint',label:'Complaint'},
{value:'other',label:'Other'}
];

const statuses=[
{value:'all',label:'Semua Status'},
{value:'pending',label:'Pending'},
{value:'process',label:'Diproses'},
{value:'resolved',label:'Selesai'},
{value:'rejected',label:'Ditolak'}
];

export default function AdminFeedbackPage(){

const[loading,setLoading]=useState(true);
const[data,setData]=useState<Feedback[]>([]);
const[selected,setSelected]=useState<Feedback|null>(null);

const[search,setSearch]=useState('');
const[category,setCategory]=useState('all');
const[status,setStatus]=useState('all');

const loadData=async()=>{
try{
setLoading(true);
const res=await fetch('/api/admin/feedback',{cache:'no-store'});
const json=await res.json();
if(json.success)setData(json.data??[]);
}catch(err){
console.error(err);
}finally{
setLoading(false);
}
};

useEffect(()=>{
loadData();
},[]);

const filtered=useMemo(()=>{

let items=[...data];

if(search.trim()){
const keyword=search.toLowerCase();
items=items.filter(item=>
item.nama.toLowerCase().includes(keyword)||
item.email.toLowerCase().includes(keyword)||
item.title.toLowerCase().includes(keyword)
);
}

if(category!=='all'){
items=items.filter(item=>item.category===category);
}

if(status!=='all'){
items=items.filter(item=>item.status===status);
}

return items;

},[data,search,category,status]);

const total=data.length;
const pending=data.filter(i=>i.status==='pending').length;
const processCount=data.filter(i=>i.status==='process').length;
const resolved=data.filter(i=>i.status==='resolved').length;

const badge=(status:string)=>{
switch(status){
case'pending':
return'bg-yellow-100 text-yellow-700';
case'process':
return'bg-blue-100 text-blue-700';
case'resolved':
return'bg-green-100 text-green-700';
case'rejected':
return'bg-red-100 text-red-700';
default:
return'bg-slate-100 text-slate-700';
}
};

const badgeText=(status:string)=>{
switch(status){
case'pending':
return'Pending';
case'process':
return'Diproses';
case'resolved':
return'Selesai';
case'rejected':
return'Ditolak';
default:
return status;
}
};

return(
<main className="max-w-7xl mx-auto p-6">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-bold">Feedback Member</h1>
<p className="text-slate-500 mt-2">Kelola seluruh masukan, kritik, saran, dan laporan bug dari pengguna.</p>
</div>
<button onClick={loadData} className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700">Refresh</button>
</div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

<div className="rounded-2xl border bg-white p-6 shadow-sm">
<div className="text-sm text-slate-500">Total Feedback</div>
<div className="mt-2 text-4xl font-black text-slate-800">{total}</div>
</div>

<div className="rounded-2xl border bg-yellow-50 p-6 shadow-sm">
<div className="text-sm text-yellow-700">Pending</div>
<div className="mt-2 text-4xl font-black text-yellow-700">{pending}</div>
</div>

<div className="rounded-2xl border bg-blue-50 p-6 shadow-sm">
<div className="text-sm text-blue-700">Diproses</div>
<div className="mt-2 text-4xl font-black text-blue-700">{processCount}</div>
</div>

<div className="rounded-2xl border bg-green-50 p-6 shadow-sm">
<div className="text-sm text-green-700">Selesai</div>
<div className="mt-2 text-4xl font-black text-green-700">{resolved}</div>
</div>

</div>

<div className="rounded-3xl border bg-white shadow">

<div className="border-b p-6">

<div className="grid lg:grid-cols-3 gap-4">

<input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama, email atau judul..." className="rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100"/>

<select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100">
{categories.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
</select>

<select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100">
{statuses.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
</select>

</div>

</div>
<div className="overflow-x-auto">

{loading&&<div className="py-24 text-center text-slate-500">Memuat data feedback...</div>}

{!loading&&filtered.length===0&&<div className="py-24 text-center"><div className="text-6xl mb-4">📭</div><h3 className="text-xl font-bold">Belum ada feedback</h3><p className="text-slate-500 mt-2">Tidak ditemukan feedback sesuai filter.</p></div>}

{!loading&&filtered.length>0&&(
<table className="min-w-full">

<thead className="bg-slate-50 border-b">

<tr>

<th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Member</th>

<th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Judul</th>

<th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Kategori</th>

<th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Rating</th>

<th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Status</th>

<th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Tanggal</th>

<th className="px-6 py-4 text-center text-sm font-bold text-slate-700">Aksi</th>

</tr>

</thead>

<tbody>

{filtered.map(item=>(

<tr key={item.id} className="border-b hover:bg-slate-50 transition">

<td className="px-6 py-5">

<div className="font-semibold text-slate-800">{item.nama}</div>

<div className="text-sm text-slate-500">{item.email}</div>

</td>

<td className="px-6 py-5">

<div className="font-semibold">{item.title}</div>

<p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.message}</p>

</td>

<td className="px-6 py-5">

<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

{categories.find(c=>c.value===item.category)?.label??item.category}

</span>

</td>

<td className="px-6 py-5 text-center">

{item.rating>0?

<div className="flex justify-center gap-1">

{[1,2,3,4,5].map(star=><span key={star} className={`${star<=item.rating?'text-yellow-400':'text-slate-300'} text-lg`}>★</span>)}

</div>

:

<span className="text-slate-400">-</span>

}

</td>

<td className="px-6 py-5 text-center">

<span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(item.status)}`}>

{badgeText(item.status)}

</span>

</td>

<td className="px-6 py-5 text-center whitespace-nowrap text-sm text-slate-500">

{new Date(item.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}

</td>

<td className="px-6 py-5 text-center">

<button onClick={()=>setSelected(item)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">

Detail

</button>

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>
{selected&&(
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
<div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
<div className="flex items-center justify-between border-b px-8 py-6">
<div>
<h2 className="text-2xl font-bold">Detail Feedback</h2>
<p className="text-slate-500 mt-1">Lihat detail dan balas feedback member.</p>
</div>
<button onClick={()=>setSelected(null)} className="h-10 w-10 rounded-full hover:bg-slate-100 text-2xl">×</button>
</div>

<div className="p-8 space-y-6">

<div className="grid md:grid-cols-2 gap-6">

<div>
<div className="text-sm text-slate-500">Nama Member</div>
<div className="font-bold text-lg mt-1">{selected.nama}</div>
</div>

<div>
<div className="text-sm text-slate-500">Email</div>
<div className="font-semibold mt-1">{selected.email}</div>
</div>

<div>
<div className="text-sm text-slate-500">Kategori</div>
<div className="mt-2">
<span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{categories.find(x=>x.value===selected.category)?.label??selected.category}</span>
</div>
</div>

<div>
<div className="text-sm text-slate-500">Status</div>
<div className="mt-2">
<span className={`rounded-full px-3 py-1 text-sm ${badge(selected.status)}`}>{badgeText(selected.status)}</span>
</div>
</div>
</div>


<div>
<div className="text-sm text-slate-500">Judul</div>
<div className="mt-2 text-xl font-bold">{selected.title}</div>
</div>

<div>
<div className="text-sm text-slate-500 mb-2">Isi Feedback</div>
<div className="rounded-2xl border bg-slate-50 p-5 whitespace-pre-wrap leading-7">
{selected.message}
</div>
</div>

<div>
<div className="text-sm text-slate-500 mb-2">Rating</div>
<div className="flex gap-1">
{selected.rating>0?[1,2,3,4,5].map(star=><span key={star} className={`text-3xl ${star<=selected.rating?'text-yellow-400':'text-slate-300'}`}>★</span>):<span className="text-slate-400">Tidak memberikan rating.</span>}
</div>
</div>

<div>
<label className="block mb-2 text-sm font-semibold">Status Feedback</label>
<select id="feedbackStatus" defaultValue={selected.status} className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100">
<option value="pending">Pending</option>
<option value="process">Diproses</option>
<option value="resolved">Selesai</option>
<option value="rejected">Ditolak</option>
</select>
</div>

<div>
<label className="block mb-2 text-sm font-semibold">Balasan Admin</label>
<textarea id="feedbackReply" rows={7} defaultValue={selected.adminReply??''} placeholder="Tulis balasan kepada member..." className="w-full rounded-2xl border px-5 py-4 outline-none resize-none focus:ring-4 focus:ring-blue-100"/>
</div>

<div className="flex justify-end gap-4 pt-2">

<button onClick={()=>setSelected(null)} className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-50">
Tutup
</button>

<button
className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
onClick={async()=>{

const status=(document.getElementById('feedbackStatus')as HTMLSelectElement).value;
const adminReply=(document.getElementById('feedbackReply')as HTMLTextAreaElement).value;

const res=await fetch(`/api/admin/feedback/${selected.id}`,{
method:'PATCH',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({status,adminReply})
});

const json=await res.json();

if(!json.success){
alert(json.message);
return;
}

alert('Feedback berhasil diperbarui.');
setSelected(null);
loadData();

}}
>
Simpan Balasan
</button>

</div>

</div>
</div>
</div>
)}
</main>
)}