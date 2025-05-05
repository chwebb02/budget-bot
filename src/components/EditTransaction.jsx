import React, {useEffect, useState, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {TransactionContext} from '../context/TransactionContext';
import * as txService from '../services/transactionService';

export function EditTransaction() {
    const { id } = useParams();
    const {editTransaction} = useContext(TransactionContext);
    const [transaction, setTransaction] = useState(null);
    const [form, setForm] = useState({
        description: '',
        amount: 0,
        category: '',
        date: ''
    });
    const navigate = useNavigate();

useEffect(() => {
    txService.getTransactionById(id).then(res => {
    const tx = res.data; 
    if(tx){
        setTransaction(tx); 
        setForm({
            description: tx.description,
            amount: tx.amount,
            category: tx.category,
            date: tx.date
        });
    } else {
        navigate('/transactions');
    }
    });
}, [id, navigate]);

    if(!form) return <div>Loading transaction...</div>;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await editTransaction(id, {
            description: form.description,
            amount: parseFloat(form.amount),
            category: form.category,
            date: form.date
        });
        navigate('/transactions');
};

return(
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save Changes
        </button>
        <button type="button" onClick={() => navigate('/transactions')} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
        </button>
    </form>
    );  
}
