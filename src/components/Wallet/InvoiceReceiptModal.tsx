import React from 'react';
import { Invoice } from '../../types/finance';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Building2,
  FileText,
  QrCode,
  ShieldCheck
} from 'lucide-react';

interface Props {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceReceiptModal: React.FC<Props> = ({ invoice, isOpen, onClose }) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const content = `
==================================================
CLIPFORGE MEDIA NETWORK - TAX INVOICE / RECEIPT
Invoice No: ${invoice.invoiceNumber}
Date: ${invoice.date}
Status: ${invoice.status.toUpperCase()}
--------------------------------------------------
Customer: ${invoice.customerName}
Email: ${invoice.customerEmail}
KRA PIN: ${invoice.kraPin || 'N/A'}
Address: ${invoice.customerAddress || 'Nairobi, Kenya'}

ITEMS:
${invoice.items.map((it) => `- ${it.description} x${it.quantity} @ ${it.unitPriceKES} KES = ${it.totalPriceKES} KES`).join('\n')}

Subtotal: ${invoice.subtotalKES} KES
16% VAT: ${invoice.vatKES} KES
TOTAL PAID: ${invoice.totalKES} KES

Payment Ref: ${invoice.transactionReference} (${invoice.paymentMethod})
==================================================
Thank you for using ClipForge Financial Gateway.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoiceNumber}.txt`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Actions Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              Tax Invoice & Payment Receipt
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Print Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPDF}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              title="Download Statement"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="space-y-6 text-xs text-slate-700">
          {/* Header Brand */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center">
                  CK
                </div>
                <span className="font-heading font-extrabold text-xl text-slate-900">
                  ClipForge Technologies Ltd
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                KRA PIN: P051289341Z • VAT Reg: #VAT-482910<br />
                Westlands Commercial Center, Nairobi, Kenya
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                {invoice.status}
              </span>
              <h4 className="font-mono font-extrabold text-base text-slate-900 pt-1">
                {invoice.invoiceNumber}
              </h4>
              <p className="text-[11px] text-slate-500">
                Date: <strong>{invoice.date}</strong>
              </p>
            </div>
          </div>

          {/* Customer & Payment Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Billed To</span>
              <p className="font-bold text-slate-900 text-sm">{invoice.customerName}</p>
              <p className="text-slate-600">{invoice.customerEmail}</p>
              {invoice.kraPin && <p className="text-slate-500 font-mono">KRA PIN: {invoice.kraPin}</p>}
              <p className="text-slate-500">{invoice.customerAddress || 'Nairobi, Kenya'}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Payment Reference</span>
              <p className="font-mono font-bold text-slate-900 text-sm">{invoice.transactionReference}</p>
              <p className="text-slate-600">Method: {invoice.paymentMethod}</p>
              <p className="text-emerald-700 font-bold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cleared in Full
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Price (KES)</th>
                  <th className="p-3 text-right">Total (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-semibold text-slate-900">{item.description}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">{item.unitPriceKES.toLocaleString()}</td>
                    <td className="p-3 text-right font-bold text-slate-900">
                      {item.totalPriceKES.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Totals */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{invoice.subtotalKES.toLocaleString()} KES</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>16% VAT Tax:</span>
                <span className="font-bold text-slate-900">{invoice.vatKES.toLocaleString()} KES</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-300 font-extrabold text-base text-slate-900">
                <span>Total Paid:</span>
                <span className="text-indigo-600">{invoice.totalKES.toLocaleString()} KES</span>
              </div>
            </div>
          </div>

          {/* Verification Stamp & QR Code */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Official Electronic Tax Invoice Generated via ClipForge Payment Engine</span>
            </div>

            <div className="flex items-center gap-2 font-mono font-bold">
              <QrCode className="w-6 h-6 text-slate-800" />
              <span>KRA-TIMS-#89210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
