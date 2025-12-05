import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Generate a monthly statement PDF for a customer.
 * @param {object} customer - Customer document
 * @param {Array} invoices - Array of invoice documents
 * @param {number} year
 * @param {number} month 1–12
 * @returns {Promise<string>} absolute file path
 */
export async function createStatementPDF(customer, invoices, year, month) {
  return new Promise((resolve, reject) => {
    const ym = `${year}-${String(month).padStart(2, "0")}`;
    const outDir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filePath = path.join(outDir, `statement-${customer._id}-${ym}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const periodLabel = new Date(year, month - 1, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    doc.fontSize(20).text("Account Statement", { align: "left" });
    doc.moveDown(0.5);
    doc.fontSize(12);
    doc.text(`Customer: ${customer.name} <${customer.email}>`);
    if (customer.companyName) doc.text(`Company: ${customer.companyName}`);
    if (customer.vatNumber) doc.text(`VAT: ${customer.vatNumber}`);
    doc.text(`Period: ${periodLabel}`);
    doc.moveDown(1);

    let totalPaid = 0;
    let totalUnpaid = 0;

    doc.fontSize(13).text("Invoices", { underline: true });
    doc.moveDown(0.3);

    if (!invoices.length) {
      doc.fontSize(11).text("No invoices in this period.");
    } else {
      invoices.forEach((inv) => {
        const date = new Date(inv.createdAt).toLocaleDateString();
        const line = `${inv.invoiceNumber} | ${date} | €${inv.grandTotal.toFixed(
          2
        )} | ${inv.paymentStatus.toUpperCase()}`;
        doc.fontSize(11).text(line);

        if (inv.paymentStatus === "paid") totalPaid += inv.grandTotal;
        else totalUnpaid += inv.grandTotal;
      });
    }

    doc.moveDown(0.8);
    doc.fontSize(13).text("Summary", { underline: true });
    doc.moveDown(0.3);
    doc.fontSize(11);
    doc.text(`Total paid:      €${totalPaid.toFixed(2)}`);
    doc.text(`Outstanding:     €${totalUnpaid.toFixed(2)}`);
    doc.text(
      `Total billed:    €${(totalPaid + totalUnpaid).toFixed(2)}`
    );

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}
