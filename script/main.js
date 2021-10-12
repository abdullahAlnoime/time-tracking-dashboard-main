let chooseEmployer = document.querySelectorAll('.choose span');
let chooseTimeFrames = document.querySelectorAll('.employer .time-frames span');
let imageAvatar = document.querySelector('.employer .info img');
let nameAvatar = document.querySelector('.employer .info p');
let employer = document.querySelector('.employer');
let myContainer = document.querySelector('.container .sp');
(function getDataFile() {
  let myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let information = JSON.parse(this.responseText);
      chooseEmployer.forEach((elm, index) => {
        elm.onclick = function() {
          removeAllClicked();
          elm.classList.add('clicked');
          employer.classList.add('active');
          imageAvatar.src = information[index].head[1];
          nameAvatar.innerHTML = `<span>Report for</span><br>${information[index].head[0]}<br>`;
          myContainer.innerHTML = ``;
          removeAllClick();
          chooseTimeFrames.forEach((el, ind) => {
            el.addEventListener('click', function() {
              myContainer.innerHTML = ``;
              removeAllClick();
              el.classList.add('click');
              for (var i = 0; i < Object.keys(information[index].body).length; i++) {
                myDoc = `
                <div class = "card ${Object.keys(information[index].body)[i]}">
                  <div>
                    <div>
                      <span>${Object.keys(information[index].body)[i]}</span>
                      <img src="./images/icon-ellipsis.svg" alt="ellipsis icon" />
                    </div>
                    <div>
                      <span>${information[index].body[Object.keys(information[index].body)[i]].timeframes[el.textContent.toLowerCase()].current}hrs</span>
                      <p>last ${Object.keys(information[index].body)[i]} - <span>${information[index].body[Object.keys(information[index].body)[i]].timeframes[el.textContent.toLowerCase()].previous}hrs</span></p>
                    </div>
                  </div>
                </div>
               `;
                myContainer.innerHTML += myDoc;
              }
            });
          });
        };
      });
    }
  };
  myReq.open('POST', '../data/data.json', true);
  myReq.send();
})();

function removeAllClicked() {
  chooseEmployer.forEach((elm) => {
    elm.classList.remove('clicked');
  });
  employer.classList.remove('active');
}

function removeAllClick() {
  chooseTimeFrames.forEach((elm) => {
    elm.classList.remove('click');
  });
}