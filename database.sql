-- ===============================
-- RECRUITIX FINAL SCHEMA (FIXED)
-- ===============================

DROP TABLE IF EXISTS shortlists;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id   INT AUTO_INCREMENT PRIMARY KEY,
    email     VARCHAR(100)            NOT NULL UNIQUE,
    password  VARCHAR(255)            NOT NULL,
    role      ENUM('student', 'recruiter') NOT NULL,
    is_active TINYINT(1)              NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE students (
    student_id     INT AUTO_INCREMENT PRIMARY KEY,
    user_id        INT             NOT NULL,
    enrollment_no  VARCHAR(50)     NOT NULL UNIQUE,
    name           VARCHAR(100)    NOT NULL,
    cgpa           DECIMAL(4,2)    NOT NULL DEFAULT 0.00,
    skills         TEXT,
    resume_url     VARCHAR(500),
    degree_url     VARCHAR(500),
    ranking_score  DECIMAL(6,2)    NOT NULL DEFAULT 0.00,

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===============================
-- COMPANIES TABLE
-- ===============================
CREATE TABLE companies (
    company_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT          NOT NULL,
    company_name  VARCHAR(150) NOT NULL,
    description   TEXT,
    website       VARCHAR(300),

    CONSTRAINT fk_company_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


    job_id            INT AUTO_INCREMENT PRIMARY KEY,
    company_id        INT             NOT NULL,
    title             VARCHAR(150)    NOT NULL,
    description       TEXT,
    skills            TEXT,
    expected_package  DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
    min_cgpa          DECIMAL(4,2)    NOT NULL DEFAULT 0.00,
    status            ENUM('active', 'closed') NOT NULL DEFAULT 'active',
    created_at        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_company
        FOREIGN KEY (company_id) REFERENCES companies(company_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE applications (
    application_id  INT AUTO_INCREMENT PRIMARY KEY,
    student_id      INT             NOT NULL,
    job_id          INT             NOT NULL,
    application_date TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          ENUM('applied', 'shortlisted', 'rejected') NOT NULL DEFAULT 'applied',
    ranking_order   INT                      DEFAULT NULL,

    UNIQUE KEY uq_student_job (student_id, job_id),

    CONSTRAINT fk_application_student
        FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_application_job
        FOREIGN KEY (job_id) REFERENCES jobs(job_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE shortlists (
    shortlist_id    INT AUTO_INCREMENT PRIMARY KEY,
    application_id  INT             NOT NULL UNIQUE,
    shortlisted_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_shortlist_application
        FOREIGN KEY (application_id) REFERENCES applications(application_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
