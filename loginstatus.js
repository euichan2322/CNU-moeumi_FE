//세션확인,로그인유지 --> 아직 잘 모르겠음 추후 변경경
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
    changeUI(data.account_id);
  } catch (error) {
    changeUI(null); // 로그인 되지 않았을때,,
    console.log('세션 없음');
  }
}

//로그인버튼 로그아웃버튼으로 바뀌는 함수수
function changeUI(account_id) {
  const loginBtn = document.getElementById('head_log');

  if (account_id) {
    loginBtn.textContent = '로그아웃';
    loginBtn.onclick = logout;
  } else {
    loginBtn.textContent = '로그인';
    loginBtn.onclick = () => (window.location.href = 'login.html'); //화살표함수
  }
}

//로그아웃함수(로그인페이지 제외)
async function logout() {
  try {
    const response = await fetch('http://백엔드주소/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account_id }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok || data.success !== 'true') {
      throw new Error('로그아웃 실패');
    }

    changeUI(null);
    alert(`${data.message}`);
    window.location.href = 'main.html';
  } catch (error) {
    alert('로그아웃 중 오류가 발생했습니다.');
  }
}

//함수정의끝
//코드 실행
document.addEventListener('DOMContentLoaded', async function () {
  await checkSession();
});
