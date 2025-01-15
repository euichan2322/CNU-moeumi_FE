import { config } from './config.js';

async function getData() {
  try {
    const response = await fetch(config.serverURL + 'alarm', {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('getData 오류 :', error);
  }
}

async function displayData() {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexWrap =
    'wrap'; /*자식 요소들이 컨테이너를 벗어날 때 다음 줄로 자동으로 넘겨줌*/
  container.style.gap = '20px';
  container.style.padding = '20px';
  document.body.appendChild(container);

  try {
    const data = await getData();

    data.response.forEach((group) => {
      /*foreach는 배열을 순회하는 매서드, 반복문이지만 값을 반환하지 않는 것이 특징! */
      const box = document.createElement('div');
      box.style.backgroundColor = 'white';
      box.style.width = '400px';
      box.style.margin = '20px';
      box.style.borderRadius = '10px';
      box.style.padding = '15px';
      box.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      box.style.display = 'flex';
      box.style.flexDirection = 'column';

      const groupTitle = document.createElement('h3');
      groupTitle.textContent = group.business_group_name;
      groupTitle.style.borderBottom = '1.3px solid lightgrey';
      groupTitle.style.padding = '10px 0';
      groupTitle.style.marginBottom = '15px';
      box.appendChild(groupTitle);

      const alarmList = document.createElement('ul');
      alarmList.style.listStyleType = 'none';
      alarmList.style.padding = '0';
      alarmList.style.margin = '0';
      alarmList.style.flex = '1'; /*남은 공간 같게 만들기 */

      group.alarm.forEach((alarm) => {
        const [datePart, timepart] = alarm.timestamp.split(' ');
        const [year, month, day] = datePart.split('-');

        //날짜 전체 테두리 같은거 + 알람 테두리
        const alarmItem = document.createElement('li');
        alarmItem.style.display = 'flex';
        alarmItem.style.justifyContent = 'space-between';
        alarmItem.style.alignItems = 'center';
        alarmItem.style.marginBottom = '10px';
        alarmItem.style.borderBottom = '1px solid lightgrey'; // 타이틀 아래 줄
        alarmItem.style.paddingBottom = '10px';

        //날짜 컨테이너
        const dateContainer = document.createElement('div');
        dateContainer.style.textAlign = 'center';
        dateContainer.style.marginRight = '15px';

        //일 컨테이너
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.style.fontSize = '18px';
        dayElement.style.fontWeight = 'bold';

        //연-월 컨테이너
        const yearMonthElement = document.createElement('div');
        yearMonthElement.textContent = `${year}.${month}`;
        yearMonthElement.style.fontSize = '12px';
        yearMonthElement.style.color = '#666';

        dateContainer.appendChild(dayElement);
        dateContainer.appendChild(yearMonthElement);

        // 알람 타이틀
        const titleElement = document.createElement('span');
        titleElement.textContent = alarm.title;
        titleElement.style.flex = '1';
        titleElement.style.whiteSpace = 'nowrap'; //줄바꿈 안 된게 해줌
        titleElement.style.overflow = 'hidden'; //박스 범위 초과하면 글자 안보여줌
        titleElement.style.textOverflow = 'ellipsis'; //글자 잘릴때 ...해줌
        titleElement.style.cursor = 'pointer';
        titleElement.addEventListener('mouseover', () => {
          titleElement.style.textDecoration = 'underline';
        });
        titleElement.addEventListener('mouseout', () => {
          titleElement.style.textDecoration = 'none';
        });
        titleElement.addEventListener('click', () => {
          window.open(alarm.url, '_blank'); // URL 새 창 열기
        });

        alarmItem.appendChild(dateContainer);
        alarmItem.appendChild(titleElement);
        alarmList.appendChild(alarmItem);
      });

      box.appendChild(alarmList);

      // 더보기 버튼!
      const moreButton = document.createElement('div');
      moreButton.textContent = '더보기';
      moreButton.style.textAlign = 'center';
      moreButton.style.color = 'black';
      moreButton.style.fontWeight = 'bold';
      moreButton.style.fontSize = '20px';
      moreButton.style.cursor = 'pointer';
      moreButton.style.padding = '5px 0';
      moreButton.addEventListener('click', () => {
        if (groupTitle.textContent == '소프트웨어중심대학사업단') {
          window.open(config.sojoong, '_blank');
        } else if (groupTitle.textContent == '인공지능혁신융합대학사업단') {
          window.open(config.inhyuck, '_blank');
        } else if (groupTitle.textContent == '차세대통신혁신융합대학사업단') {
          window.open(config.chahyuck, '_blank');
        } else if (groupTitle.textContent == 'EnergyAI핵심인재양선교육연구단') {
          window.open(config.EAI, '_blank');
        } else if (groupTitle.textContent == '전남대 포털 공지사항') {
          window.open(config.potal, '_blank');
        } else if (groupTitle.textContent == '학사 안내') {
          window.open(config.haksa, '_blank');
        } else if (groupTitle.textContent == '장학 안내') {
          window.open(config.janghack, '_blank');
        } else if (groupTitle.textContent == '취업 안내') {
          window.open(config.chjin, '_blank');
        } else {
          alert('지원하지 않습니다');
        }
      });

      box.appendChild(moreButton);
      container.appendChild(box);
    });
  } catch (error) {
    console.error('displayData 오류:', error);
  }
}

displayData();
