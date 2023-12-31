class Document {
  constructor(doc_id, doc_type, doc_date, doc_desc, doc_file, emp_id) {
    this.doc_id = doc_id;
    this.doc_type = doc_type;
    this.doc_date = doc_date;
    this.doc_desc = doc_desc;
    this.doc_file = doc_file;
    this.emp_id = emp_id;
  }
}

class Prescription extends Document {
  constructor(doc_id, doc_type, doc_date, doc_desc, doc_file, emp_id, presc_desc, med_serial_num) {
    super(doc_id, doc_type, doc_date, doc_desc, doc_file, emp_id);
    this.presc_desc = presc_desc;
    this.med_serial_num = med_serial_num;
  }
}

class Certificate extends Document {
  constructor(doc_id, doc_type, doc_date, doc_desc, doc_file, emp_id, cert_duration, remaining_days) {
    super(doc_id, doc_type, doc_date, doc_desc, doc_file, emp_id);
    this.cert_duration = cert_duration;
    this.remaining_days = remaining_days;
  }
}
module.exports = { Document, Prescription, Certificate };