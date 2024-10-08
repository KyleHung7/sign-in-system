import React, { useState, useEffect } from 'react';

function SignInApp() {
  // 狀態：儲存多筆使用者資料
  const [entries, setEntries] = useState(() => {
    // 嘗試從 localStorage 中讀取初始值
    const savedEntries = localStorage.getItem('entries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [username, setUsername] = useState(''); // 單筆使用者姓名

  // 狀態：當前日期與星期
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  // 當組件加載時更新日期和星期
  useEffect(() => {
    const today = new Date();
    const date = today.toLocaleDateString();
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const day = dayNames[today.getDay()];

    setCurrentDate(date);
    setCurrentDay(day);
  }, []);

  // 每次 entries 狀態變化時將其保存到 localStorage
  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username) {
      const newEntry = {
        id: Date.now(),  // 每筆資料的唯一 ID
        username: username,
        date: currentDate,
        day: currentDay
      };

      // 新增資料到 entries 陣列
      setEntries([...entries, newEntry]);
      setUsername('');  // 提交後清空姓名輸入框
    }
  };

  // 處理刪除按鈕
  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);  // 根據 id 刪除資料
    setEntries(updatedEntries);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>簽到系統</h1>

      {/* 表單 */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>姓名：</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="請輸入你的姓名" 
            style={styles.input}
            required
          />
        </div>

        {/* 顯示日期 */}
        <div style={styles.inputContainer}>
          <label style={styles.label}>日期：</label>
          <span style={styles.date}>{currentDate} {currentDay}</span>
        </div>

        {/* 提交按鈕 */}
        <button type="submit" style={styles.button}>送出</button>
      </form>

      {/* 顯示所有提交的資料 */}
      <div style={styles.outputContainer}>
        <h2>輸入的資料</h2>
        {entries.map((entry) => (
          <div key={entry.id} style={styles.outputBox}>
            <p style={styles.outputText}><strong>姓名：</strong>{entry.username}</p>
            <p style={styles.outputText}><strong>日期：</strong>{entry.date} {entry.day}</p>
            {/* 刪除按鈕 */}
            <button 
              onClick={() => handleDelete(entry.id)} 
              style={styles.deleteButton}
            >
              刪除
            </button>
          </div>
        ))}
      </div>

      {/* 即時顯示輸入的姓名（只有當 username 有內容時才顯示） */}
      {username && <p style={styles.livePreview}>正在輸入：{username}</p>}
    </div>
  );
}

// 樣式
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    overflowY: 'scroll',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '300px',
  },
  inputContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    marginRight: '10px',
    fontSize: '1.2rem',
    width: '60px',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1',
  },
  date: {
    fontSize: '1.2rem',
    textAlign: 'center',
    width: '80%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  livePreview: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'left',
    marginTop: '20px', // 增加 marginTop 讓正在輸入的內容和輸入的資料保持一定距離
  },
  outputContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
  },
  outputBox: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    position: 'relative',
    width: '300px',
    margin: '0 auto',
    textAlign: 'left',
  },
  outputText: {
    textAlign: 'left',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '0.9rem',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};

export default SignInApp;
