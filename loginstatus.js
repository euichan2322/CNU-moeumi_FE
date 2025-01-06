//세션확인,로그인유지
async function checkSession() {
  try {
    const response = await fetch('http://백엔드주소/user/session', {
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

//로그인버튼 로그아웃버튼으로 바뀌는거
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
    const response = await fetch('http://백엔드주소/user/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }

    changeUI(null);
    alert('로그아웃 되었습니다.');
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
