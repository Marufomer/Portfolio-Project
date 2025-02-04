# ALX Forum

ALX Forum is a community-driven Q&A platform for **ALX students** to ask and answer programming-related questions.

- **Author**: [Maruf Omer](https://linkedin.com/in/maruf-omer-b320392b3)

## 📸 Screenshot
![Home Page](image/home%20page.png)
![Profile Page](image/profile%20page.png)
![Login Page](image/login%20page.png)

## 🚀 Features
- 📝 **Ask Questions** – Users can post questions with tags.
- 💬 **Answer Questions** – Community-driven responses.
## 📸 Screenshot
![Home Page](image/Answer%20page.png)
- 🔎 **Search & Filter** – Find questions easily.

## 🛠 Technologies Used
| Technology  | Usage |
|------------|----------------------|
| **React.js** | Frontend UI |
| **Bootstrap** | Styling & Layout |
| **Node.js & Express.js** | Backend API |
| **MySQL** | Database Management |

## ⚙️ Installation Guide

### **1️⃣ Prerequisites**
- Install [Node.js](https://nodejs.org/)
- Install MySQL (or use a cloud-based database)

### **2️⃣ Setup Project**
#### Clone the Repository:
```sh
git clone https://github.com/your-repo/Portfolio-Project.git
cd Portfolio-Project
```

#### Install Dependencies:
```sh
npm install
```

### **3️⃣ Run the Application**

## Database Structure
### Tables:
1. **Users**
   - `id` (Primary Key, Auto Increment)
   - `firstName` (VARCHAR, not null)
   - `lastName` (VARCHAR, not null)
   - `email` (VARCHAR, Unique)
   - `password` (VARCHAR, not null)

2. **Questions**
   - `question_id` (UUID, Primary Key)
   - `user_id` (Foreign Key → Users.id)
   - `title` (VARCHAR, not null)
   - `description` (TEXT, not null)

3. **Answers**
   - `id` (Primary Key, Auto Increment)
   - `question_id` (Foreign Key → Questions.question_id)
   - `user_id` (Foreign Key → Users.id)
   - `answer` (TEXT)

4. **Images**
   - `id` (Primary Key, Auto Increment)
   - `user_id` (Foreign Key → Users.id, not null)
   - `image` (VARCHAR, not null)


**Set up your environment variables**:
Create a `.env` file in the backend directory with the following:

```env
SECRET=your-jwt-sercert
USER=your-database-user
DATABASE=your-database-name
PASSWORD=your-database-password
```

#### Start the Backend Server:
```sh
cd server
nodemon app.js
```

#### Start the Frontend:
```sh
cd client
cd src
npm run dev
```

🔗 Open `http://localhost:8080` in your browser.

## Usage
- Register as a user
- Login and post a question
- Answer questions from other users

## 📌 Contribution
🚀 Contributions are welcome! Feel free to **fork** the repo, create a **feature branch**, and submit a **pull request**.

## 📜 License
This project is licensed under the **MIT License**.

---
## Contact
- **Live Demo:** [Click here](https://drive.google.com/file/d/1IYJkScz1RTM3bjGhq-rygXc1koNKkwLX/view?usp=drive_link)
- **Author:** [Maruf Omer](https://linkedin.com/in/maruf-omer-b320392b3)
- **Email:** [omermaruf07@gmail.com](omermaruf07@gmail.com)

