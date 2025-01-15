//즐겨찾기 뭐했는지 조회함수
async function getData() {
  try {
    const response = await fetch('...', {
      method: 'GET',
    });
    if (response.status == 401) {
      alert(`${response.message}`);

      return;
    }
    const likeData = await response.json();

    const businessGroupMap = {
      소프트웨어중심대학사업단: 'sojoong',
      인공지능혁신융합대학사업단: 'inhyuck',
      차세대통신혁신융합대학사업단: 'chahyuck',
      EnergyAI핵심인재양선교육연구단: 'EAI',
      전남대포털공지사항: 'potal',
      학사안내: 'haksa',
      장학안내: 'janghack',
      취업진로공지: 'chjin', //중요--> 서버랑 이름 맞추기!!!!!!
    };

    console.log(likeData);

    likeData.message.forEach((item) => {
      const starId = businessGroupMap[item.business_group_name];
      if (starId) {
        const star = document.getElementById(starId);
        if (star) {
          star.setAttribute('fill', item.liked ? 'yellow' : 'none');
        } else {
          console.log(`${starId} 찾을 수 없음`);
        }
      }
    });
  } catch (error) {
    console.log('데이터 오류');
  }
}

getData();
//

//별 눌렀을때 ui 변경, 데이터 수정
const favoriteStatus = {};

const starIds = [
  'sojoong',
  'inhyuck',
  'chahyuck',
  'EAI',
  'potal',
  'haksa',
  'janghack',
  'chjin',
];

starIds.forEach((starId) => {
  const star = document.getElementById(starId);
  if (star) {
    star.addEventListener('click', function () {
      let path = this.querySelector('path');
      let currentFill = path.getAttribute('fill');
      let newFill = currentFill === 'yellow' ? 'none' : 'yellow';
      path.setAttribute('fill', newFill);

      favoriteStatus[starId] = newFill === 'yellow' ? 1 : 0;
    });
  } else {
    console.warn(`ID가 '${starId}'인 요소를 찾을 수 없습니다.`);
  }
});

//저장하기 버튼 눌렀을 때 즐겨찾기 수정 보내기
document
  .getElementById('save_btn')
  .addEventListener('click', async function () {
    try {
      // 서버 형식
      const favoriteList = Object.keys(favoriteStatus).map((key) => ({
        business_group_name: key,
        liked: favoriteStatus[key],
      }));

      const request = {
        message: favoriteList,
      };

      const response = await fetch(config.serverURL + 'mypage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (response.ok) {
        alert('즐겨찾기가가 저장되었습니다.');
        console.log(result);
      } else {
        alert(`저장 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생하였습니다.');
    }
  });
//
