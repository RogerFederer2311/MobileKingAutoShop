namespace MobileKingAutoShop.Server
{
    public static class AppSettings
    {
        public static string SERVICE_REQUESTS_TABLE = "service_requests";
        public static string SELECT_SERVICE_REQUESTS_COLUMNS =
            "service_request_id,customer_email,vehicle_id,issue_description,service_date,status,address,city,state,zip_code,country";
        public static string ADD_SERVICE_REQUESTS_COLUMNS =
            "customer_email,vehicle_id,issue_description,service_date,status,address,city,state,zip_code,country";
        public static string VEHICLES_TABLE = "vehicles";
        public static string SELECT_VEHICLES_COLUMNS =
            "vehicle_id,customer_email,vin,license_plate,make,model,year,color,is_hidden";
        public static string ADD_VEHICLES_COLUMNS =
            "customer_email,vin,license_plate,make,model,year,color,is_hidden";
        public static string USERS_TABLE = "users";
        public static string SELECT_USERS_COLUMNS =
            "email,first_name,last_name,phone_number,gender,other_gender,password,role,address,city,state,zip_code,country";
        public static string ADD_USERS_COLUMNS =
            "email,first_name,last_name,phone_number,gender,other_gender,password,role,address,city,state,zip_code,country";
        public static string CUSTOMER_CREDIT_CARDS_TABLE = "customer_credit_cards";
        public static string SELECT_CUSTOMER_CREDIT_CARDS_COLUMNS =
            "credit_card_id,customer_email,card_number,security_code,expiration_date,is_hidden";
        public static string ADD_CUSTOMER_CREDIT_CARDS_COLUMNS =
            "customer_email,card_number,security_code,expiration_date,is_hidden";
        public static string INVOICES_TABLE = "invoices";
        public static string SELECT_INVOICES_COLUMNS =
            "invoice_id,service_request_id,amount,due_date";
        public static string ADD_INVOICES_COLUMNS =
            "service_request_id,amount,due_date";
        public static string JOB_ASSIGNMENTS_TABLE = "job_assignments";
        public static string SELECT_JOB_ASSIGNMENTS_COLUMNS =
            "job_assignment_id,service_request_id,technician_email,status,start_time,end_time";
        public static string ADD_JOB_ASSIGNMENTS_COLUMNS =
            "service_request_id,technician_email,status,start_time,end_time";
        public static string PAYMENTS_TABLE = "payments";
        public static string SELECT_PAYMENTS_COLUMNS =
            "payment_id,credit_card_id,invoice_id,amount,payment_date";
        public static string ADD_PAYMENTS_COLUMNS =
            "credit_card_id,invoice_id,amount,payment_date";
        public static string TECHNICIAN_SPECIALTIES_TABLE = "technician_specialties";
        public static string SELECT_TECHNICIAN_SPECIALTIES_COLUMNS = "specialty_id,technician_email,specialty";
        public static string ADD_TECHNICIAN_SPECIALTIES_COLUMNS = "technician_email,specialty";
        public static string WORK_DONE_TABLE = "work_done";
        public static string SELECT_WORK_DONE_COLUMNS = "work_done_id,job_assignment_id,description";
        public static string ADD_WORK_DONE_COLUMNS = "job_assignment_id,description";
    }
}
