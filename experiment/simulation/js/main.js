// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const cancelSpeech = ()=>{
  window.speechSynthesis.cancel()
  ccQueue = []
}

const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    cancelSpeech()
    Dom.hideAll()
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text,speak=true) => {
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  if(isMute || !speak){
    utterance.volume = 0
    utterance.rate = 10
  }
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25, speak = true) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift()
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())`
      // }
    }
  });
  let utterance = textToSpeach(text,speak)
  return utterance
}  

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  getValue() {
    return this.item.attributes["value"].value;
  }
  setValue(val) {
    this.item.attributes["value"].value = val;
  }
  hidden(isHidden) {
    if (isHidden == false) this.item.style.visibility = "visible";
    else this.item.style.visibility = "hidden";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  left(leftPixel) {
    this.item.left = leftPixel + "px";
    return this;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}



// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true,
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(443, 216, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(700, 352).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },
  plotGraphBar(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel
    Scenes.items.chart.label[graphIdx].x = xLabel
    // for label
    Scenes.items.yLabel.set(289, 310, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(663, 409).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
      fontSize: "18px",
    });
    

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let data = {
      labels: ['220', '470', '1000'],
      datasets: [
        {
            label: '1',
            backgroundColor: 'rgba(0, 128, 0, 1)',
            borderColor: 'rgba(0, 128, 0, 1)',
            borderWidth: 1,
            data: []
          },
          {
            label: '10',
            backgroundColor: 'rgba(255, 0, 0, 1)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
            data: []
          },
          {
            label: '40',
            backgroundColor: 'rgba(0, 0, 255, 1)',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
            data: [],
        }
      ]
    }

    
    let options = {
      maintainAspectRatio: false,
      scales: {
          xAxes: [{
              ticks: {
                  display: true,
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontColor: 'black',
              }
          }],
          yAxes: [{
              ticks: {
                display: true,
                beginAtZero: true,
                  // fontSize: 17,
                  // fontWeight: 'bold',
                  // fontColor: 'black',
                  // beginAtZero: true,
                  // autoSkip: false,
                  // position: "right",
                  // maxRotation: 90, // Rotate labels to 90 degrees
                  // minRotation: 90,
                  // callback: function(value) {
                  //   return value // You can add custom formatting here if needed
                  // }
              }
          }]
      }
    }
    if(startEmpty){
      datasets=[]
    }

    graphRef = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
    }
  },
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),

//!images of previous experiment
    

part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_three_two : new Dom(".part3_table_three_two"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_box : new Dom(".universal-slider"),

graph0: new Dom(".graph0"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph10: new Dom(".graph10"),
graph_box_0: new Dom(".graph_box0"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
graph_box_10: new Dom(".graph_box10"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),



btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),


btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory

// theory image removed

btn_transparent: new Dom(".btn-transparent"),

// ! Procedure formula Nomenclature images 
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),

// ! Procedure formula Nomenclature images end


// EE2 images added
btn_reset_connections: new Dom(".btn-connections"),

    //! EE20 images added 



      alpha_c_value : new Dom("alpha_c_value"),
      btn_delete : new Dom("btn_delete"),
      btn_hint : new Dom("btn_hint"),
      btn_plot : new Dom("btn_plot"),
      btn_record : new Dom("btn_record"),
      btn_reset : new Dom("btn_reset"),
      btn_reset_2 : new Dom("btn_reset_2"),
      btn_verify : new Dom("btn_verify"),
      circuit_c : new Dom("circuit_c"),
      circuit_lc : new Dom("circuit_lc"),
      hint_box_c_filter : new Dom("hint_box_c_filter"),
      hint_box_lc_filter : new Dom("hint_box_lc_filter"),
      load_1 : new Dom("load_1"),
      load_2 : new Dom("load_2"),
      option_1 : new Dom("option_1"),
      option_2 : new Dom("option_2"),
      page_c_0 : new Dom("page_c_0"),
      page_c_30 : new Dom("page_c_30"),
      page_c_60 : new Dom("page_c_60"),
      page_lc_0 : new Dom("page_lc_0"),
      page_lc_30 : new Dom("page_lc_30"),
      page_lc_60 : new Dom("page_lc_60"),
      select_option_full : new Dom("select_option_full"),
      tab_1 : new Dom("tab_1"),
      tab_1f : new Dom("tab_1f"),
      tab_2 : new Dom("tab_2"),
      tab_2f : new Dom("tab_2f"),
      tab_3 : new Dom("tab_3"),
      tab_3f : new Dom("tab_3f"),
      tab_4 : new Dom("tab_4"),
      tab_4f : new Dom("tab_4f"),
      tab_5 : new Dom("tab_5"),
      tab_5f : new Dom("tab_5f"),
      tab_c_0f_deg : new Dom("tab_c_0f_deg"),
      tab_c_0_deg : new Dom("tab_c_0_deg"),
      tab_c_30f_deg : new Dom("tab_c_30f_deg"),
      tab_c_30_deg : new Dom("tab_c_30_deg"),
      tab_c_60f_deg : new Dom("tab_c_60f_deg"),
      tab_c_60_deg : new Dom("tab_c_60_deg"),
      tab_lc_0_deg : new Dom("tab_lc_0_deg"),
      tab_lc_30_deg : new Dom("tab_lc_30_deg"),
      tab_lc_60_deg : new Dom("tab_lc_60_deg"),
      text_c_filter : new Dom("text_c_filter"),
      text_lc_filter : new Dom("text_lc_filter"),
      text_performance_characteristics : new Dom("text_performance_characteristics"),
      val_100 : new Dom("val_100"),
      val_1000 : new Dom("val_1000"),
      val_220 : new Dom("val_220"),
      val_680 : new Dom("val_680"),
      option_1_circuit : new Dom("option_1_circuit"),
      graph_bcg : new Dom("graph_bcg"),
      tab_c_filter : new Dom("tab_c_filter"),
      right_tick_1 : new Dom("right_tick_1"),
      right_tick_2 : new Dom("right_tick_2"),
      white_bcg : new Dom("white_bcg"),
      green_line : new Dom("green_line"),
      load_1f : new Dom("load_1f"),
      load_2f : new Dom("load_2f"),
      val_100f : new Dom("val_100f"),
      val_220f : new Dom("val_220f"),
      val_680f : new Dom("val_680f"),
      val_1000f : new Dom("val_1000f"),
      
      btn_plot : new Dom("btn_plot"),
      c_filter_val_1 : new Dom("c_filter_val_1"),
      C_filter_val_2 : new Dom("C_filter_val_2"),
      C_filter_val_3 : new Dom("C_filter_val_3"),
      l_filter_val_1 : new Dom("l_filter_val_1"),
      l_filter_val_2 : new Dom("l_filter_val_2"),
      l_filter_val_3 : new Dom("l_filter_val_3"),
      option_2_components : new Dom("option_2_components"),
      option_2_graph_bcg : new Dom("option_2_graph_bcg"),
      option_2_load : new Dom("option_2_load"),
      tab_0 : new Dom("tab_0"),
      tab_30 : new Dom("tab_30"),
      tab_60 : new Dom("tab_60"),
      
      option_2_circuit : new Dom("option_2_circuit"),
      tab_deg : new Dom("tab_deg"),
      tab_filter_1 : new Dom("tab_filter_1"),
      tab_filter_2 : new Dom("tab_filter_2"),
    
      option_2_tab_1 : new Dom("option_2_tab_1"),
      option_2_tab_2 : new Dom("option_2_tab_2"),
      option_2_tab_3 : new Dom("option_2_tab_3"),
    


      //!  EE20 images end here


concept_development: new Dom(".concept_development"), 
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


  chart: {
    graph: [
      graph1=null,
      graph2=null,
      graph3=null,
      graph4=null,
      graph5=null,
      graph6=null,
      graph7=null,
      graph8=null,
      graph9=null,
      graph10=null,
      graph11=null,
    ],
    label: [
      label1 = {
        x: "Label 2",
        y: "Label 1",
      },
      label2 = {
        x: "Label 2",
        y: "Label 1",
      },
      label3 = {
        x: "Label 2",
        y: "Label 1",
      },
      label4 = {
        x: "Label 2",
        y: "Label 1",
      },
      label5 = {
        x: "Label 2",
        y: "Label 1",
      },
      label6 = {
        x: "Label 2",
        y: "Label 1",
      },
      label7 = {
        x: "Label 2",
        y: "Label 1",
      },
      label8 = {
        x: "Label 2",
        y: "Label 1",
      },
      label9 = {
        x: "Label 2",
        y: "Label 1",
      },
      label10 = {
        x: "Label 2",
        y: "Label 1",
      },
      label11 = {
        x: "Label 2",
        y: "Label 1",
      },
    ]
  }


  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  // ! for handeling current load selection in EE16
  currentLoad: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  hideStepHeading(){
    document.querySelector(".step-heading").style.visibility = "hidden"
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0,0],
  // ! for handeling current load selection in EE16
  operationAndWaveformDone: 0,
  
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),

      (objective = function () {
        setIsProcessRunning(true);
        Dom.hideAll()
        // require
        Scenes.items.slider_box.hide()
        
        let btn_transparent = Scenes.items.btn_transparent.set().item;
  
        Scenes.items.concept_development.set().styles({
          zIndex: "5000",
          scale: "1 0.915",
          top: "-144px",
          position: "absolute",
        })
  
        // ! Slide ended enable the button next button
        function checkIsSlideEnded(){
          let isSlideEnded = localStorage.getItem("isSlideEnded")
          if(isSlideEnded=="true"){
            btn_transparent.disabled = false
            setIsProcessRunning(false)
            btn_transparent.classList.remove("btn-disabled")
            // setCC("Click next to goto next slide.")
            Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
            btn_transparent.onclick = ()=>{
              Scenes.next()
              localStorage.setItem("isSlideEnded",false)
              window.clearInterval(interval)
            }
          }
        }
        var interval = window.setInterval(checkIsSlideEnded, 1000)
          
        return true;
      }),
      
    //! part1 Circuit formulation c filter
    (step2 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      setCC("Connect the terminals to form a single phase controlled bridge rectifier with C-filter")


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.circuit_c.set(61, 20, 392)
      Scenes.items.btn_verify.set(30, -36, 49).zIndex(1)
      Scenes.items.btn_reset.set(30+120, -36, 52).zIndex(1)
      Scenes.items.btn_hint.set(826, -8, 40).zIndex(1)
      Scenes.items.hint_box_c_filter.set(205, 12, 322).zIndex(1).hide()
      
      let blinkText = Scenes.items.text_c_filter.set(258, -33, 86)
      anime({
        targets: blinkText.item,
        loop: true,
        duration: 1000,
        scale: [1, 1.1],   
        direction: "alternate",   
        easing: "easeInOutQuad"
      })

      let hint_btn = Scenes.items.btn_hint;
      hint_btn.item.onmouseenter = ()=>{
        Scenes.items.hint_box_c_filter.show()
      }
      hint_btn.item.onmouseout = ()=>{
        Scenes.items.hint_box_c_filter.hide()
      }
 

      
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)

          setCC("Connections are correct. Proceed for experimentation.")

          // * destroy all the connection
          
          
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_verify.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 23
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 6, 9, 10, 12, 14, 16]
          let yAxisFixed = [3, 4, 7, 8, 10, 11, 13, 15, 17]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 9
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              Dom.setBlinkArrowRed(true,66, 14, 30,30,90).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1, color = "ff0000"){
              let radius = 7
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: `#${color}` },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: `#${color}`, strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            //colors code
            // red = ff0000
            // Yellow = f2b50c
            // Black = 0070c0
            // Blue = 000000
            

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint(2)
          


            function addEndPoints(){

              // ! for all red wire

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 5
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              //conn 6
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 7
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 8
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 8
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
           
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),


    //! part2 Circuit formulation LC filter
    (step3 = function () {
      setIsProcessRunning(true);

      // * Destroy all connections
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()


      setCC("Connect the terminals to form a single phase controlled bridge rectifier with LC-filter")


      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.circuit_c.set(61, 20, 392)
      Scenes.items.btn_verify.set(30, -36, 49).zIndex(1)
      Scenes.items.btn_reset.set(30+120, -36, 52).zIndex(1)
      Scenes.items.btn_hint.set(826, -8, 40).zIndex(1)
      Scenes.items.hint_box_lc_filter.set(205, 12, 322).zIndex(1).hide()
      
      let blinkText = Scenes.items.text_lc_filter.set(258, -33, 86)
      anime({
        targets: blinkText.item,
        loop: true,
        duration: 1000,
        scale: [1, 1.1],   
        direction: "alternate",   
        easing: "easeInOutQuad"
      })

      let hint_btn = Scenes.items.btn_hint;
      hint_btn.item.onmouseenter = ()=>{
        Scenes.items.hint_box_lc_filter.show()
      }
      hint_btn.item.onmouseout = ()=>{
        Scenes.items.hint_box_lc_filter.hide()
      }
 

      
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)

          setCC("Connections are correct. Proceed for experimentation.")

          // * destroy all the connection
          
          
          //to go to next step 
          // setCC("Click 'Next' to go to next step");
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, press Reset and try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_verify.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 23
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 6, 9, 10, 12, 14, 16, 10]
          let yAxisFixed = [3, 4, 7, 8, 18, 11, 13, 15, 17, 19]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 10
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              Dom.setBlinkArrowRed(true,66, 14, 30,30,90).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1, color = "ff0000"){
              let radius = 7
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: `#${color}` },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: `#${color}`, strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            //colors code
            // red = ff0000
            // Yellow = f2b50c
            // Black = 0070c0
            // Blue = 000000
            

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint(2)
          


            function addEndPoints(){

              // ! for all red wire

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 5
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 6
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 7
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              
              //conn 8
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 8
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //conn 9
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
    
           
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),

    // //! Operations and waveforms
    (step4 = function(){

      setIsProcessRunning(true);
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      //to hide the slider
      sliders.hideAll()
      Scenes.items.btn_next.show();
      let items = Scenes.items

      items.white_bcg.set(641, -9, 355, 300)
      items.green_line.set(619, 119, 108).zIndex(5).hide()

      setCC("It is a controlled rectifier. Its principle of operation and waveforms depend on the firing angle.")
      setCC("Understand the rectifier operation by changing the firing angle and plotting various waveforms.")

      Dom.setBlinkArrowRed(true,254, 281, 30,30,-90).play()

      let arrows = [
        ()=>{

        },
        ()=>{
          setCC("Change the firing angle and analyse the waveform")
          Dom.setBlinkArrowRed(true,254 + 80, 281, 30,30,-90).play()
        },
        ()=>{
          setCC("Change the firing angle and analyse the waveform")
          Dom.setBlinkArrowRed(true,254 - 80, 281+ 118, 30,30,90).play()
        },
        ()=>{
          setCC("Change the firing angle and analyse the waveform")
          Dom.setBlinkArrowRed(true,254, 281+ 118, 30,30,90).play()
        },
        ()=>{
          setCC("Change the firing angle and analyse the waveform")
          Dom.setBlinkArrowRed(true,254 + 80, 281+ 118, 30,30,90).play()
        },
        ()=>{
          Dom.setBlinkArrowRed(-1)
          Dom.setBlinkArrow(true, 790, 408).play()
          Scenes.currentStep = 5
          setIsProcessRunning(false)
          setCC("Click 'Next' to go to next step")
          return true
        }
      ]
      let pages = [
        items.page_c_0.set(2, -20, 433).zIndex(1),
        items.page_c_30.set(2, -20, 433).zIndex(1).hide(),
        items.page_c_60.set(2, -20, 433).zIndex(1).hide(),
        items.page_lc_0.set(2, -20, 433).zIndex(1).hide(),
        items.page_lc_30.set(2, -20, 433).zIndex(1).hide(),
        items.page_lc_60.set(2, -20, 433).zIndex(1).hide(),
      ]
      let degrees = [
          items.tab_c_0_deg.set(152, 315, 38).zIndex(3).hide(),
          items.tab_c_30_deg.set(152+80, 315, 38).zIndex(3),
          items.tab_c_60_deg.set(152+80+ 80, 315, 38).zIndex(3),
          items.tab_lc_0_deg.set(152, 315 + 50, 38).zIndex(3),
          items.tab_lc_30_deg.set(152+80, 315 + 50, 38).zIndex(3),
          items.tab_lc_60_deg.set(152+80+ 80, 315 + 50, 38).zIndex(3),
      ]
      let clickedDegrees = [
        items.tab_c_0f_deg.set(152, 313, 46).zIndex(4).hide(),
        items.tab_c_30f_deg.set(152+80, 313, 46).zIndex(4).hide(),
        items.tab_c_60f_deg.set(152+80+ 80, 313, 46).zIndex(4).hide(),
        items.tab_c_0f_deg.set(152, 313, 46).zIndex(4).hide(),
        items.tab_c_30f_deg.set(152+80, 313, 46).zIndex(4).hide(),
        items.tab_c_60f_deg.set(152+80+ 80, 313, 46).zIndex(4).hide(),

      ]

      //functionality 
      function showButton (key){

        degrees.forEach((ele, idx) =>{
          if(idx == key ){
            return
          }
          ele.show()
        })

        clickedDegrees.forEach((ele, idx) =>{
          if(key == idx){
            return
          }
          ele.hide()
        })

      }
      let currentGraph = pages[0]
      degrees.forEach((ele, idx) =>{
        ele.item.onclick = ()=>{
          arrows[idx]()
          items.green_line.hide()
          if(idx == 3){
            items.green_line.show()
          }
          showButton(idx)
          degrees[idx].hide()
          currentGraph.hide()
          currentGraph = pages[idx]
          currentGraph.show()
        }
        
      })

    }),

    //! select option
    (step5 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      
      // * remove all previous restrictions
      
      // * Required Elements

      //! new added
      Scenes.items.select_option_full.set(40, 19, 245)
      Scenes.items.option_1.set(74, 164, 210).zIndex(1)
      Scenes.items.option_2.set(74 + 425, 164, 210).zIndex(1)
      // // hide the slider
      Scenes.items.slider_box.hide()
      // resloving the step to css
      Scenes.items.slider_box.item.style.scale = "1";


      // let rightTicks = [
      //   Scenes.items.right_tick_1.set(640,35,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_2.set(655,105,44).zIndex(2001).hide(),
      //   Scenes.items.right_tick_3.set(655,180,44).zIndex(2000).hide(),
      //   Scenes.items.right_tick_4.set(645,255,44).zIndex(2000).hide()
      // ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()
      
      let rightTicks = [
        Scenes.items.right_tick_1.set(95,190,20).hide(),
        Scenes.items.right_tick_2.set(520,190,20).hide(),
      ]

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }


      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.option_1,
        Scenes.items.option_2,
      ]

      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        
        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[0+6]()
      }
      const opTwo = ()=>{
      
        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[1+6]()
      }

      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      

      // ! if all options done then exit
      let exit = true
      for(let i=0;i<2;i++){
        if(Scenes.optionsDone[i]==0){
          exit = false
          break
        }
        if(Scenes.optionsDone[i]==1){
          rightTicks[i].show()
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
        return true
      }

      if(Scenes.optionsDone[0] == 0 && Scenes.optionsDone[1] == 0){
        setCC("First select the Rectifier with C-Filter")
      }else if(Scenes.optionsDone[0] == 1){
        setCC("Now select the Rectifier with L-C-Filter")
      }

      return true;

    }),
        

   //! table step c filter
    (step6 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");

      Scenes.hideStepHeading()
      
      // ! step completed then to this
      if(Scenes.currentLoad == 2){
        Scenes.currentLoad = 1
      }else if(Scenes.currentLoad == 1){
        Scenes.currentLoad = 2
      }

      sliders.v_knob.classList.add("slider-V-arrow_step1")
      sliders.v_knob.classList.remove("slider-V-arrow_step2")
      $(".slider .v .value-box").css("visibility", "hidden");
      
      // reset load parameters
      // Scenes.items.load_1.removeClass("load-active")
      // Scenes.items.load_1.removeClass("load-deactive")
      // Scenes.items.load_2.removeClass("load-deactive")
      // Scenes.items.load_2.removeClass("load-active")
      
      // ! to hide slider
      // sliders.hideAll()
      //!new added for EE12
      Scenes.items.part3_table_three.set(10, 245)

      Scenes.items.option_1_circuit.set(6, -34, 157)  
      // Scenes.items.part_3_option_1_load_1.set(25, 97, 55).zIndex(2)
      let loads_value = [100, 50]
      let loads = [
        Scenes.items.load_1.set(220, 150, 32).zIndex(2),
        Scenes.items.load_2.set(220, 150+35, 32).zIndex(2),
      ]
      
      let loads_f = [
        Scenes.items.load_1f.set(220, 150, 32).zIndex(2).hide(),
        Scenes.items.load_2f.set(220, 150+35, 32).zIndex(2).hide(),
      ]
      Scenes.items.alpha_c_value.set(443, 144, 75)


      Scenes.items.tab_c_filter.set(456 - 8, -25 + 10, 117)
      let vals_value = [100, 220, 680, 1000]
      let vals = [
        Scenes.items.val_100.set(456 - 8 + 30, -24 + 10, 30).zIndex(2),
        Scenes.items.val_220.set(456 - 8 + 30, -24 + 30 + 10, 30).zIndex(2),
        Scenes.items.val_680.set(456 - 8 + 30, -24+ 30 + 30 + 10, 30).zIndex(2),
        Scenes.items.val_1000.set(456 - 8 + 30, -24+ 30 + 30 +30 + 10, 30).zIndex(2),
      ]

      let vals_f = [
        Scenes.items.val_100f.set(456 - 8 + 30, -24 + 10, 30).zIndex(2).hide(),
        Scenes.items.val_220f.set(456 - 8 + 30, -24 + 30 + 10, 30).zIndex(2).hide(),
        Scenes.items.val_680f.set(456 - 8 + 30, -24+ 30 + 30 + 10, 30).zIndex(2).hide(),
        Scenes.items.val_1000f.set(456 - 8 + 30, -24+ 30 + 30 +30 + 10, 30).zIndex(2).hide(),
      ]
      
      Scenes.items.text_performance_characteristics.set(572, -45, 46)
      Scenes.items.tab_1.set(571 + (122.7 * 0), 12, null, 122.7).zIndex(2)
      Scenes.items.tab_2.set(571 + (122.7 * 1), 12, null, 122.7).zIndex(2)
      Scenes.items.tab_3.set(571 + (122.7 * 2), 12, null, 122.7).zIndex(2)
      Scenes.items.tab_4.set(571 + (184 * 0), 54, null, 184).zIndex(2)
      Scenes.items.tab_5.set(571 + (184 * 1), 54, null, 184).zIndex(2)

      Scenes.items.tab_1f.set(571 + (122.7 * 0), 12, null, 122.7).zIndex(2).hide()
      Scenes.items.tab_2f.set(571 + (122.7 * 1), 12, null, 122.7).zIndex(2).hide()
      Scenes.items.tab_3f.set(571 + (122.7 * 2), 12, null, 122.7).zIndex(2).hide()
      Scenes.items.tab_4f.set(571 + (184 * 0), 54, null, 184).zIndex(2).hide()
      Scenes.items.tab_5f.set(571 + (184 * 1), 54, null, 184).zIndex(2).hide()
      
      Scenes.items.tempTitle24.setContent("Firing Angle (in degree)").set(14,131,null,217).zIndex(1002).styles({color: "red"})

      Scenes.items.btn_record.set(578 , 362+ 30, 42)
      Scenes.items.btn_delete.set(578  +150, 362+ 30, 42)
      Scenes.items.btn_reset_2.set(578  +253, 362+ 30, 48)
      sliders.resetSlidersValue()
      sliders.showAll()

      // let rightTicks = [
      //   Scenes.items.right_tick_1.set(656,21,19).hide(),
      //   Scenes.items.right_tick_2.set(716,21,19).hide(),
      //   Scenes.items.right_tick_3.set(779,21, 19).hide(),
      //   Scenes.items.right_tick_4.set(840,21, 19).hide(),
      //   Scenes.items.right_tick_5.set(898,21, 19).hide(),
      // ]

      // var st = {
      //   color: "black",
      //   backgroundColor: "white"
      // }
      // let voltageText = Scenes.items.tempTitle40.set(288, -63).styles(st).setContent("xx")    
      // let phyTempText = Scenes.items.tempTitle40.set(643,385).styles(st).setContent("0")    
      // let betaTempText = Scenes.items.tempTitle41.set(644,344).styles(st).setContent("0")  
      
      let vInValue = 0
      let dutyRatioValue = 0
      let resistanceValue = 0
      let inductanceValue = 0
      let capacitance = 0
      let criticalValue = 20 // Todo update with formula
      let isLoadAndInductanceSelected = false
      let isCapacitanceSelected = false

      // ! onclick for load selecting buttons
      let disableLoadClick = ()=>{
        isCapacitanceSelected = true
      }
      let disableCapacitanceClick = ()=>{
        isLoadAndInductanceSelected = true
      }
      
      let ciriticalValueTempTitle = Scenes.items.tempTitle54.set(475,190).setContent("0.00").styles({color: "black"}).hide()

      // ! btn Load onclick
      loads.forEach((load, idx)=>{
        load.item.onclick = ()=>{
          if(isLoadAndInductanceSelected){
            return
          }
          // When load is clicked goto capicitance
          Dom.setBlinkArrowRed(true, 409, 25,30,null,-180).play()
          setCC("Select the value of filter capacitor")
          
          resistanceValue = loads_value[idx]
          inductanceValue = 40

          loads_f.forEach(load_f=>load_f.hide())
          loads_f[idx].show()

        }
      })

      // ! btn C - filter onclick
      vals.forEach((val, idx)=>{
        val.item.onclick = ()=>{
          if(isCapacitanceSelected){
            return
          }
          // When capicitance is clicked show critical value goto record
          Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
          setCC("Press record button")

          capacitance = vals_value[idx]

          ciriticalValueTempTitle.show().setContent(`${criticalValue}`)

          vals_f.forEach(val_f=>val_f.hide())
          vals_f[idx].show()
        }
      })

      let valuesToMatch = [] 

      let table = new Dom(".part3_table_three").item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,53, -10,30,null,-90).play()

        setCC("Set the source voltage")
        
        
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV(()=>{
            Dom.setBlinkArrowRed(true, 174, 168,30,null,-180).play()
            setCC("Select the load")
          })
          sliders.v_knob.click()
          // Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
        }

        sliders.d.onclick = ()=>{
          Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
          setCC("Press record button")
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = null
      let graph_height = null

      let graph_box_height = null
      let graph_box_top = null

      Scenes.items.graph_box_0.addClass("graph_box_step1")
      Scenes.items.graph_box_1.addClass("graph_box_step1")
      Scenes.items.graph_box_2.addClass("graph_box_step1")
      Scenes.items.graph_box_3.addClass("graph_box_step1")
      Scenes.items.graph_box_4.addClass("graph_box_step1")
      Scenes.items.graph_box_5.addClass("graph_box_step1")
      
      let dataLabelX = "Firing angle (α)"
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_1,
            Scenes.items.graph_box_2,
            Scenes.items.graph_box_3, 
            Scenes.items.graph_box_4,
            Scenes.items.graph_box_5,
          ],
          graph: [
            Scenes.items.graph1.item,
            Scenes.items.graph2.item,
            Scenes.items.graph3.item,
            Scenes.items.graph4.item,
            Scenes.items.graph5.item,
          ]
        }
        let data = {
          labels: [
            "Vdc",
            "Vac",
            "Vpp",
            "Idc",
            "RF",
          ],
          colors: [
            "#0000ff",
            "#0000ff",
            "#0000ff",
            "#0000ff",
            "#0000ff",
          ],
          datas:[],
        }
        let yLabels = [
          "Output voltage (V<sub>dc</sub>)",
          "Output voltage ripple (V<sub>ac</sub>)",
          "Peak to peak Output Voltage (V<sub>pp</sub>)",
          "Output current (I<sub>dc</sub>)",
          "Ripple Factor",
        ]
        function getDataFromTable(){
          let datas_XY = [] // v0,i0,p0,PF,THD
          let indexForTableColunmDataY = [3,5,4,7,6]
          let indexForTableColumnDataX = 2
          indexForTableColunmDataY.forEach(col_idx=>{
            let datas = []
            let rows = table.tBodies[0].rows
            // get data from rows.cells
            for(let row of rows){
              let x = row.cells[indexForTableColumnDataX].innerHTML
              let y = row.cells[col_idx].innerHTML
              let data = {x,y}
              datas.push(data);
            }
            // save data on datas_XY
            datas_XY.push(datas)
          })
          return datas_XY
        }
        // table data to array conversion
        let datas_XY = getDataFromTable()
        data.datas = datas_XY

        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let 
            xLabel = dataLabelX,
            yLabel = yLabels[idx],
            dataArray = data.datas[idx],
            dataLabel = data.labels[idx],
            dataColor = data.colors[idx]
            // plot empty graph
            let graphRef = Scenes.plotGraph(ctx,idx,true,xLabel,yLabel)

            // ! for second tab graph where (two dataset exist)
            let mergeIdxStart = 20 // no need in this
            if(idx == mergeIdxStart || idx == mergeIdxStart + 1){
              let labels = ["It_rms", "Iin_1"]
              let colors = ["#c55a11","#c00000"]
              let dataIdx = [5, 6] // it is ref idx for data 
              let localIdx = idx - mergeIdxStart
              // for i0 and iSCR
              let data_1 = {
                array: data.datas[idx],
                label: data.labels[idx],
                color: data.colors[idx],
              }
              let data_2 = {
                array: data.datas[dataIdx[localIdx]],
                label: labels[localIdx],
                color: colors[localIdx],
              }
              Scenes.graphFeatures.addDataset(graphRef,data_1.label,data_1.color,data_1.array)
              Scenes.graphFeatures.addDataset(graphRef,data_2.label,data_2.color,data_2.array)
            }
            
            else{
              // plot empty first then add data
              Scenes.graphFeatures.addDataset(graphRef,dataLabel,dataColor,dataArray)
            }
          })
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              Dom.setBlinkArrowRed(-1)
              // showArrowForAll()
              setCC("Here Ripple factor is constant for firing angle less then critical value while it starts increasing with firing angle more than critical value.").onend = ()=>{
                // todo for reset and select different firing angle
                // setCC("")
                Dom.setBlinkArrow(true, 790, 408).play()
                setCC("Click 'Next' to go to next step")
                setIsProcessRunning(false)
                Scenes.currentStep = 5
              }
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,739,-23,30,null,-90).play(),
              ()=>Dom.setBlinkArrowRed(true,862,-23,30,null,-90).play(),
              ()=>Dom.setBlinkArrowRed(true,756,17,30,null,-90).play(),
              ()=>Dom.setBlinkArrowRed(true,827,17,30,null,-90).play(),
            ],
            texts: [
              "Here, the DC output load voltage is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value.",

              "Here, AC component in output voltage is constant for firing angle less then critical value while it starts increasing with firing angle more than critical value.",
              
              "Here peak to peak ripple voltage is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value.",

              "Here output current is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value.",

            ]
          }
          let btns = [
            Scenes.items.tab_1,
            Scenes.items.tab_2,
            Scenes.items.tab_3,
            Scenes.items.tab_4,
            Scenes.items.tab_5,
          ]

          let btns_f = [
            Scenes.items.tab_1f,
            Scenes.items.tab_2f,
            Scenes.items.tab_3f,
            Scenes.items.tab_4f,
            Scenes.items.tab_5f,
          ]

          btns.forEach((btn,idx)=>{

            btn.item.onclick = () =>{
              //for labeling
              btns_f[idx].show()
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "DC output voltage is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value."
                  break;
                
                case 1: 
                  conclusionFront = "AC component in output voltage is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value."
                  break;
                
                case 2: 
                  conclusionFront = "peak to peak output voltage is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value."
                  break;
                
                case 3: 
                  conclusionFront = "Output current is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value."
                  break;
                  
                case 4: 
                  conclusionFront = "Ripple factor is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value."
                  break;
              }
              Scenes.items.tempTitle1.set(5, -40, null, 382).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }
              if(isRunning){
                for(let i in btns){
                  // btns[i].opacity(0.4)
                  // rightTicks[i].opacity(0.4)
                }
              }
              btn.opacity(1)


              // * show current clicked graph and labels
              ctxs.graph_box[idx].set(null, graph_box_top, graph_box_height)
              // showing right tick
              // rightTicks[idx].set()
              if(idx < btns.length - graphIdx - 1){
                subtitles.arrows[idx]()
                // setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)
            }
            // btns_f[idx].show()
            btns_f[idx].item.onclick = btn.item.onclick
          })
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(287, 96, 67, 282 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx >= 8 || !isRunning){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 8
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx < 3){
          const values = [0, 'φ', 90]
          rows[recordBtnClickIdx].cells[2].innerHTML = values[recordBtnClickIdx]
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset_2.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=8
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        // reset all the parameters
        rows[0].cells[2].innerHTML = 0
        rows[1].cells[2].innerHTML = 'φ'
        rows[2].cells[2].innerHTML = 90
        // so just simply call this step again
        // sliders.reset()

        Scenes.steps[6]()
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){
        if(resistanceValue == 0){
          Dom.setBlinkArrowRed(true, 174, 168,30,null,-180).play()
          setCC("Select the load")
          return  
        }else if(capacitance == 0){
          Dom.setBlinkArrowRed(true, 409, 25,30,null,-180).play()
          setCC("Select the value of filter capacitor")
          return
        }
        if(recordBtnClickIdx == 0){
          disableCapacitanceClick()
          disableLoadClick()
        }
        // for arrow system
        if(recordBtnClickIdx < 2){
          Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
          setCC("Press record button")
        }
        else if(recordBtnClickIdx >= 2 && recordBtnClickIdx < 6){
          Dom.setBlinkArrowRed(true, 8, 231,30,null,90).play()
          setCC("Change the firing angle")
        }else if(recordBtnClickIdx == 6 ){
          Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
          setCC("Press record button")
        }

        // dutyRatioValue/d is AC voltage
        vInValue = Number(sliders.v.value)
        dutyRatioValue = Number(sliders.d.value)
        // ! for default two values
        if(recordBtnClickIdx < 3){
          const values = [0, criticalValue, 90]
          dutyRatioValue = values[recordBtnClickIdx]
        }

        //* L value is consider as c value in formulas

        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue,0,capacitance)
        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different firing angle.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows
            let valueColumnToShort = 2
            
            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                    let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
              rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()
          // ! plot all graphs
          plotGraphs()

          // ! Graph Tab Buttons click
          function graphTabButtonArrows(){
            window.speechSynthesis.cancel()
            setCC("")
            Dom.setBlinkArrowRed(true,614,-23,30,null,-90).play()
            setCC("Plot DC load voltage variation with firing angle.")
            // refer to plotGraphs() area
          }
          graphTabButtonArrows()
          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          // setIsProcessRunning(false)
          // Scenes.currentStep = 4
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disable sliders
        }
        if(recordBtnClickIdx == 7){
          return
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]

        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = Number(Formulas.c_filter.vdc(values)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.c_filter.vpp(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.c_filter.vac(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.c_filter.rf(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.c_filter.i0(values)).toFixed(2)


        // tableRow.cells[8].innerHTML = Number(Formulas.part_3.iT_rms(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.part_3.pf(values)).toFixed(2)
        // added a display none column
        // tableRow.cells[9].innerHTML = Number(Formulas.r_load.iSCR(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    

      return true;

    }),
    
    //! table step lc filter
    (step7 = function () {
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");

      Scenes.hideStepHeading()
      
      // ! step completed then to this
      if(Scenes.currentLoad == 2){
        Scenes.currentLoad = 1
      }else if(Scenes.currentLoad == 1){
        Scenes.currentLoad = 2
      }

      sliders.v_knob.classList.add("slider-V-arrow_step2")
      sliders.v_knob.classList.remove("slider-V-arrow_step1")
      $(".slider .v .value-box").css("visibility", "visible");


      // reset load parameters
    //  Scenes.items.load_1.removeClass("load-active")
    //  Scenes.items.load_1.removeClass("load-deactive")
    //  Scenes.items.load_2.removeClass("load-deactive")
    //  Scenes.items.load_2.removeClass("load-active")
      
      // ! to hide slider
      sliders.hideSlider('d')
      //!new added for EE12
      //  Scenes.items.option_2_components.set(-8, -34, 239) 
      //  Scenes.items.option_2_load.set(560, 144, 63).zIndex(1)

      Scenes.items.part3_table_three_two.set(4, 175, 270, 363)
      
      Scenes.items.option_2_load.set(474, 37, 68).zIndex(1).opacity(0.5)
      
      Scenes.items.text_performance_characteristics.set(-8, 142, 44) 

      Scenes.items.btn_plot.set(642, 166, 39).zIndex(2)
      Scenes.items.btn_delete.set(762, 167, 33).zIndex(2)
      Scenes.items.btn_reset_2.set(842, 166, 39).zIndex(2)
      
      let tabs_firing_angle = [
        Scenes.items.tab_0.set(679, -17, 38).zIndex(2).opacity(0.5),
        Scenes.items.tab_30.set(679 + 89, -17, 38).zIndex(2).opacity(0.5),
        Scenes.items.tab_60.set(679 + 178, -17, 38).zIndex(2).opacity(0.5),
      ]

      let l_filters = [
        Scenes.items.l_filter_val_1.set(655, 48, 38).zIndex(2).opacity(0.5),
        Scenes.items.l_filter_val_2.set(655 + 96, 48, 38).zIndex(2).opacity(0.5),
        Scenes.items.l_filter_val_3.set(655 + 96 + 96, 48, 38).zIndex(2).opacity(0.5),
      ]
      
      let c_filters = [
        Scenes.items.c_filter_val_1.set(655, 48 + 58, 37).zIndex(2).opacity(0.5),
        Scenes.items.C_filter_val_2.set(655 + 96, 48 + 58, 37).zIndex(2).opacity(0.5),
        Scenes.items.C_filter_val_3.set(655 + 96 + 96, 48 + 58, 37).zIndex(2).opacity(0.5),
      ]

      // Scenes.items.option_2_graph_bcg.set(367, 207, 245, 582)
      Scenes.items.option_2_circuit.set(-12, -47, null, 480)
      Scenes.items.tab_deg.set(546, -17, 39)
      Scenes.items.tab_filter_1.set(565, 48, 41)
      Scenes.items.tab_filter_2.set(565, 48 + 56, 41)
      Scenes.items.option_2_tab_1.set(374, 242, 43)
      Scenes.items.option_2_tab_2.set(374, 242 + 60, 43)
      Scenes.items.option_2_tab_3.set(374, 242 + 120, 43)

      sliders.resetSlidersValue()
      sliders.showAll()

      let vInValue = 0
      let dutyRatioValue = null
      let resistanceValue = 0
      let inductanceValue = 0
      let lFilterValue= 0
      let cFilterValue= 0
      let valuesFiringAngle = [0, 30, 60]
      let valuesLFilter = [1, 10, 40]
      let valuesCFilter = [220, 470, 1000]

      // let isLoadAndInductanceSelected = false
      // let isCapacitanceSelected = false

      // ! onclick for load selecting buttons
      // let disableLoadClick = ()=>{
      //   isCapacitanceSelected = true
      // }
      // let disableCapacitanceClick = ()=>{
      //   isLoadAndInductanceSelected = true
      // }
      
      // let ciriticalValueTempTitle = Scenes.items.tempTitle54.set(475,190).setContent("0.00").styles({color: "black"}).hide()

      // ! btn Load onclick
      Scenes.items.option_2_load.item.onclick = ()=>{
        // if(isLoadAndInductanceSelected){
        //   return
        // }
        // When load is clicked goto firing angle
        Dom.setBlinkArrowRed(true,699, 28,30,null,90).play()
        setCC("Select the firing angle")
        
        resistanceValue = 10
        inductanceValue = 40

        Scenes.items.option_2_load.opacity(1)
      }
      
      // ! tabs firing angle
      tabs_firing_angle.forEach((tab_fa, idx)=>{
        tab_fa.item.onclick = ()=>{
          if(resistanceValue == 0){
            setCC("Select the load first")
            return
          }
          dutyRatioValue = valuesFiringAngle[idx]
          tabs_firing_angle.forEach(tab=>tab.opacity(0.5))
          tab_fa.opacity(1)

          setCC("Select the value of filter inductor")
          Dom.setBlinkArrowRed(true,684, 14,30,null,-90).play()
        }
      })

      let l_filter_arrow_clicked_idx = 0
      let l_filter_arrows = [
        ()=>Dom.setBlinkArrowRed(true,684, 14,30,null,-90).play(),
        ()=>Dom.setBlinkArrowRed(true,784, 14,30,null,-90).play(),
        ()=>Dom.setBlinkArrowRed(true,878, 14,30,null,-90).play()
      ]
      // ! btn L - filter onclick Inductance
      l_filters.forEach((l_filter, idx)=>{
        l_filter.item.onclick = ()=>{
          if(dutyRatioValue == null){
            setCC("Select the firing angle first")
            return
          }
          lFilterValue = valuesLFilter[idx]
          l_filters.forEach(tab=>tab.opacity(0.5))
          c_filters.forEach(tab=>tab.opacity(0.5))
          l_filter.opacity(1)

          l_filter_arrow_clicked_idx = idx
          setCC("Select the value of filter capacitor")
          Dom.setBlinkArrowRed(true,684, 72,30,null,-90).play()
        }
      })
      // ! btn C  - filter onclick capacitance
      c_filters.forEach((c_filter, idx)=>{
        c_filter.item.onclick = ()=>{
          if(lFilterValue == 0){
            setCC("Select the value of filter inductor")
            return
          }
          cFilterValue = valuesCFilter[idx]
          c_filters.forEach(tab=>tab.opacity(0.5))
          c_filter.opacity(1)
          
          switch(idx){
            case 0:
              Dom.setBlinkArrowRed(true,784, 72,30,null,-90).play()
              setCC("Change the value of filter capacitor")
              break
            case 1:
              Dom.setBlinkArrowRed(true,878, 72,30,null,-90).play()
              setCC("Change the value of filter capacitor")
              break
            case 2:
              let showFor = l_filter_arrow_clicked_idx + 1
              if(showFor <= 2){
                l_filter_arrows[showFor]()    
                setCC("Change the value of filter inductance")
              }
              else{
                // plot button
                Dom.setBlinkArrowRed(true,679, 132,30,null,-90).play()
              }
              break
          }

          // ! click to record
          btn_record_func()
        }
      })

      let valuesToMatch = [] 

      let table = Scenes.items.part3_table_three_two.item
      
       // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // ! Tutorial Function
      // Dom.setBlinkArrowRed(true,0,0,30,null,-90)
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,56, 4,30,null,-90).play()
        setCC("Set the source voltage")
        
        sliders.v_knob.onclick = ()=>{
          sliders.sliderV(()=>{
            Dom.setBlinkArrowRed(true,495, 4,30,null,-90).play()
            setCC("Activate the load")
          })
          sliders.v_knob.click()
          // Dom.setBlinkArrowRed(true,505,-12,30,null,180).play()
        }

        // sliders.d.onclick = ()=>{
        //   Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
        //   setCC("Press record button")
        // }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }

      // ! graph
      let graph_width = null
      let graph_height = null

      let graph_box_height = null
      let graph_box_top = null

      Scenes.items.graph_box_0.addClass("graph_box_step2")
      Scenes.items.graph_box_6.addClass("graph_box_step2")
      Scenes.items.graph_box_7.addClass("graph_box_step2")
      Scenes.items.graph_box_8.addClass("graph_box_step2")
      let dataLabelX = "C<sub>f</sub> (µF)"
      let styles = {
        color: "black",
        backgroundColor: "white",
        width: "fit-content",

      }
      Scenes.items.tempTitle44.set(527,221).zIndex(4000).setContent("L<sub>f</sub> (mH)").styles(styles).hide()
      
      // ! Forshowing dummy graph
      Scenes.items.graph_box_0.set(null, graph_box_top, graph_box_height)
      Scenes.items.graph0.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph0.item
      let dummyGraphIdx = 10
      // graph idx is for  showing which graph is being shown
      let graphIdx = 6
      // * showing the dummy graph
      function showDummyGraph(){
        // if(forceShow || Scenes.items.chart.graph[dummyGraphIdx]==null){
        //   Scenes.items.graph_box_0.set()
        //   Scenes.plotGraph(ctx,dummyGraphIdx,true,dataLabelX,"")
        // }
        Scenes.items.graph_box_0.set()
      }
      showDummyGraph()  
      
      // ! To Plot graph
      function plotGraphs(){
        let ctxs = {
          graph_box: [
            Scenes.items.graph_box_6,
            Scenes.items.graph_box_7,
            Scenes.items.graph_box_8, 
          ],
          graph: [
            Scenes.items.graph6.item,
            Scenes.items.graph7.item,
            Scenes.items.graph8.item,
          ]
        }
        
        // * 
        function getDataFromTable(){
          let tableRows = table.tBodies[0].rows
          let col_idx_forumlas = [4,5,6]
          let vals = [
            [[],[],[]],
            [[],[],[]],
            [[],[],[]],
          ]
          let n = 3
          for(let k=0;k<n;k++){
            for(let i=0;i<n;i++){
              let values = []
              for(let j=i;j<= i+(n*2);j+=n){
                values.push( tableRows[j].cells[col_idx_forumlas[i]].innerHTML )
              }
              vals[k][i] = values
            }
          }
          console.log(vals)
          return vals
        }
        // table data to array conversion
        let graphData = getDataFromTable()
        // ! set all data and plot graph but hide all or don't set
        // and active all click buttons
        function dataToGraphConversion(){
          let labelY = ["DC Output Voltage", "Peak-to-peak output voltage", "Ripple Factor (RF)"]
          ctxs.graph.forEach((ctx,idx)=>{
            idx = idx
            let vals_220 = graphData[idx][0]
            let vals_470 = graphData[idx][1]
            let vals_1000 = graphData[idx][2]

            let graphRef = Scenes.plotGraphBar(ctx, idx + graphIdx, true, "", labelY[idx])

            Scenes.graphFeatures.addData(graphRef,0,vals_220)
            Scenes.graphFeatures.addData(graphRef,1,vals_470)
            Scenes.graphFeatures.addData(graphRef,2,vals_1000)
          })
         
          Scenes.items.yLabel.setContent("")
          Scenes.items.xLabel.setContent("")
        }
        dataToGraphConversion()

        // * graph tab btn onclick
        function btnGraphTab(){
          let subtitles = {
            lastButtonFunction: ()=>{
              Dom.setBlinkArrowRed(-1)
              // showArrowForAll()
              setCC("Here the Ripple factor is decreasing with increase in the value of capacitor and inductor filter.").onend = ()=>{
                Dom.setBlinkArrow(true, 790, 408).play()
                setCC("Click 'Next' to go to next step")
                setIsProcessRunning(false)
                Scenes.currentStep = 5
              }
            },
            arrows: [
              ()=>Dom.setBlinkArrowRed(true,335, 309,30,null,180).play(),
              ()=>Dom.setBlinkArrowRed(true,335, 368,30,null,180).play(),
            ],
            texts: [
              "Here DC output voltage decreases with increase in the inductance value. However it remain approximately same with increase in capacitors value.",

              "Here The peak-to-peak output voltage ripple decreases with increase in the value of capacitor and inductor filter.",
              
              // "Here peak to peak ripple voltage is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value.",

              // "Here output current is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value.",

            ]
          }
          let btns = [
            Scenes.items.option_2_tab_1,
            Scenes.items.option_2_tab_2,
            Scenes.items.option_2_tab_3,
          ]

          btns.forEach((btn,idx)=>{

            btn.item.onclick = () =>{
              //for labeling
              let conclusionFront = ""
              //* for conclusion
              switch(idx){
                case 0: 
                  conclusionFront = "DC output voltage decreases with increasing the inductance value. However it remain approximately same with increase in capacitors value."
                  break;
                
                case 1: 
                  conclusionFront = "The peak-to-peak output voltage ripple decreases with increasing the value of capacitor and inductor filter ."
                  break;
                
                case 2: 
                  conclusionFront = "The ripple factor decreases with increasing the value of capacitor and inductor filter."
                  break;
                
                // case 3: 
                //   conclusionFront = "Output current is constant for firing angle less then critical value while it starts decreasing with firing angles more than critical value."
                //   break;
                  
                // case 4: 
                //   conclusionFront = "Ripple factor is constant for firing angle less then critical value while it starts increasing with firing angles more than critical value."
                //   break;
              }
              Scenes.items.tempTitle1.set(5, -40, null, 382).setContent(conclusionFront).addClass("conclusion").zIndex(2000).item

              for(let gb of ctxs.graph_box){
                gb.hide()
              }
              if(isRunning){
                for(let i in btns){
                  // btns[i].opacity(0.4)
                  // rightTicks[i].opacity(0.4)
                }
              }
              // btn.opacity(1)


              // * show current clicked graph and labels
              ctxs.graph_box[idx].set(null, graph_box_top, graph_box_height)
              Scenes.items.tempTitle44.set()
              // showing right tick
              // rightTicks[idx].set()
              if(idx < btns.length - 1){
                subtitles.arrows[idx]()
                // setCC(subtitles.texts[idx])
              }else{
                subtitles.lastButtonFunction()
              }
              let yLabel = Scenes.items.chart.label[idx + graphIdx].y
              Scenes.items.yLabel.setContent(yLabel)
              Scenes.items.xLabel.setContent(dataLabelX)
            }
          }) 
        }
        btnGraphTab()
      }

      //* to check conclusion appearance
      // Scenes.items.tempTitle1.set(287, 96, 67, 282 ).setContent("lorem20sdhs jfjdsf ajhs;as hdf asdlhf").addClass("conclusion").zIndex(2000).item


      // ! ------------> If data already present plot the graph
      // if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
      //   // setDataToGraph()= 
      //     setIsProcessRunning(false)
      //     Scenes.currentStep  = 4

      //     recordBtnClickIdx = 21
      //     let r=7
      //     let tab=3
      //     // * to get old values from table for matching
      //     for(let i=0;i<tab;i++){
      //       let arr = []
      //       for(let j=0;j<r;j++){
      //         arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
      //       }
      //       valuesToMatch.push(arr)
      //     }

      //     disableSlider("r")
      //     disableSlider("v")
      //     setDataToGraph()
      // }else{
      //   plotGraph()
      // }
      // ! sort the data
      function sortTable(){
        var rows = table.tBodies[0].rows
        let valueColumnToShort = 2
        
        let n=9
        // ! first sort accoring to LF
        for(let i=0;i<n;i++){
            for(let j=0;j<n-i-1;j++){
                console.log(`i: ${i}, j: ${j}`)
                let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
                let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
                if(val1 > val2){
                     let temp = rows[j].innerHTML
                    rows[j].innerHTML = rows[j+1].innerHTML
                    rows[j+1].innerHTML = temp
                }
            }
        }

        // Todo sort the table rightly
        // ! second sort according to CF
        // valueColumnToShort = 3
        // n = 3
        // for(let k=0;k<n*3;k+=3){
        //   for(let i=0;i<n;i++){
        //     for(let j=0;j<n-i-1;j++){
        //       console.log(`k: ${k}, i: ${i}, j: ${j}`)
        //       j = j + k;
        //       let val1 = Number(rows[j].cells[valueColumnToShort].innerHTML)
        //       let val2 = Number(rows[j+1].cells[valueColumnToShort].innerHTML)
        //       if(val1 > val2){
        //           let temp = rows[j].innerHTML
        //           rows[j].innerHTML = rows[j+1].innerHTML
        //           rows[j+1].innerHTML = temp
        //       }
        //     }
        //   }
        // }

        n = 9
        for(let i=0;i<n;i++){
          rows[i].cells[0].innerHTML = i+1
        }
      }
      // ! onclick for plot btn
      Scenes.items.btn_plot.item.onclick = ()=>{
        if(recordBtnClickIdx < 9){
          setCC("Please select all the values first.")
          return
        }
        sortTable()
        plotGraphs()
        Dom.setBlinkArrowRed(true,335, 251,30,null,180).play()
        setCC("Plot the dc output voltage for different filter value")
      }

      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx >= 9 || !isRunning){
          return
        }
        let rows = table.tBodies[0].rows
        let n = 7
        
        for(let i=1;i<n;i++){
          rows[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset_2.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=9
        let m=7
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }
        // reset all the parameters
        // rows[0].cells[2].innerHTML = 0
        // rows[1].cells[2].innerHTML = 'φ'
        // rows[2].cells[2].innerHTML = 90
        // so just simply call this step again
        // sliders.reset()

        Scenes.steps[7]()
      }

      // ! onclick for record
      const btn_record_func = function(){
        if(resistanceValue == 0){
          Dom.setBlinkArrowRed(true, 174, 168,30,null,-180).play()
          setCC("Select the load first")
          return  
        }
        // todo disable click maybe
        // if(recordBtnClickIdx == 0){
        //   disableCapacitanceClick()
        //   disableLoadClick()
        // }
        // for arrow system
        // if(recordBtnClickIdx < 2){
        //   Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
        //   setCC("Press record button")
        // }
        // else if(recordBtnClickIdx >= 2 && recordBtnClickIdx < 6){
        //   Dom.setBlinkArrowRed(true, 8, 231,30,null,90).play()
        //   setCC("Change the firing angle")
        // }else if(recordBtnClickIdx == 6 ){
        //   Dom.setBlinkArrowRed(true, 626, 355,30,null,-90).play()
        //   setCC("Press record button")
        // }

        // dutyRatioValue/d is AC voltage
        vInValue = Number(sliders.v.value)
        // dutyRatioValue = Number(sliders.d.value)
        // // ! for default two values
        // if(recordBtnClickIdx < 3){
        //   const values = [0, criticalValue, 90]
        //   dutyRatioValue = values[recordBtnClickIdx]
        // }

        //* L value is consider as c value in formulas

        updateValues(vInValue,dutyRatioValue,resistanceValue,inductanceValue,lFilterValue, cFilterValue)
        // ! Can't select same values
        let forDuplicateValues = `${dutyRatioValue}${lFilterValue}${cFilterValue}`
        console.log(`${dutyRatioValue} ${lFilterValue} ${cFilterValue}`)
        if(recordBtnClickIdx < 9 && valuesToMatch.indexOf(forDuplicateValues)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(forDuplicateValues)
        }

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disable sliders
        }
        if(recordBtnClickIdx == 9){
          return
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]

        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = lFilterValue
        tableRow.cells[3].innerHTML = cFilterValue
        tableRow.cells[4].innerHTML = 10
        tableRow.cells[5].innerHTML = 20
        tableRow.cells[6].innerHTML = 30


        // tableRow.cells[8].innerHTML = Number(Formulas.part_3.iT_rms(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.part_3.pf(values)).toFixed(2)
        // added a display none column
        // tableRow.cells[9].innerHTML = Number(Formulas.r_load.iSCR(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        // if(recordBtnClickIdx==7){
        //   setCC("Click 'Record' to sort the table according to D and plot the graph.")
        // }
      }    

      return true;


    }),
    // ! dummy step
    // (step5 = function (){
    //   Scenes.items.part_3_circuit.set(-4, -46, 159)  
    //   sliders.resetSlidersValue()
    //   sliders.showAll()
    //   Scenes.items.part3_table_three.set(10)
    //   Scenes.setStepHeading(
    //     "",
    //     ""
    //   )
    //   // setIsProcessRunning(true);
    // }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// stepcalling
Scenes.currentStep = 2
Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next")

const backBtn = get(".btn-back")
nextBtn.addEventListener("click", () => {
  Scenes.next();
})
backBtn.addEventListener("click", () => {
  Scenes.back();
})

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }























