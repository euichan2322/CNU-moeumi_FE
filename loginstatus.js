import { config } from './config.js';

//세션확인,로그인유지 --> 아직 잘 모르겠음 추후 변경
async function checkSession() {
  try {
    const response = await fetch('http://백엔드주소/users/session', {
      method: 'GET',
      credentials: 'include', // 세션 쿠키 포함해야
    });

    if (!response.ok) {
      throw new Error('세션 없음');
    }

    const data = await response.json();
    changeUI(data.accounId);
  } catch (error) {
    changeUI(null); // 로그인 되지 않았을때

    console.log('세션 없음');
  }
}

//로그인버튼 로그아웃버튼으로 바뀌는 함수
function changeUI(accountId) {
  const loginBtn = document.getElementById('head_log');

  if (accountId) {
    loginBtn.textContent = '로그아웃';
    loginBtn.onclick = logout;
  } else {
    loginBtn.textContent = '로그인';
    loginBtn.onclick = () => (window.location.href = 'login.html'); //화살표함수
  }
}

//로그아웃함수(로그인페이지 제외) 프론트에서 뭔가 처리를 안하는게 맞지 않나, 어카운트아이디 바디에서 없애는 방향 바디가 없으면 post 댜신 다른 매서드 고민
async function logout() {
  if (loginBtn.textContent == '로그인') {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(config.serverURL + 'users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok || data.success !== 'true') {
      console.log('로그아웃 실패');
      throw new Error('로그아웃 실패');
    }

    changeUI(null);
    alert(`${data.message}`);
    window.location.href = 'main.html';
  } catch (error) {
    alert('오류가 발생했습니다.');
  }
}

//코드 실행
const loginBtn = document.getElementById('head_log');
loginBtn.addEventListener('click', async function () {
  await logout();
});
