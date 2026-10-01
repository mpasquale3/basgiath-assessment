// ========================================
// BASGIATH PRELIMINARY QUADRANT ASSESSMENT
// ========================================


// ----------------------------------------
// STATE
// ----------------------------------------

let candidateName = "";
let currentQuestion = 0;

let scores = {
  rider: 0,
  scribe: 0,
  healer: 0,
  infantry: 0
};


// ----------------------------------------
// QUESTIONS
// ----------------------------------------

const questions = [

  {
    question:
      "You're given an order that you know is going to fail. What do you do?",

    answers: [
      {
        text:
          "Follow it. There will be time to adapt when things go wrong.",
        scores: { infantry: 2 }
      },
      {
        text:
          "Question it. There has to be something everyone is overlooking.",
        scores: { scribe: 2 }
      },
      {
        text:
          "Follow it, but quietly prepare for the people who could get hurt.",
        scores: { healer: 2 }
      },
      {
        text:
          "Find a better approach and act before anyone can stop you.",
        scores: { rider: 2 }
      }
    ]
  },

  {
    question:
      "You're handed a map with four possible routes. There's no other information. Which one are you taking?",

    answers: [
      {
        text:
          "The shortest route, even though part of it isn't clearly marked.",
        scores: { rider: 2 }
      },
      {
        text:
          "The longest route, but the terrain looks predictable.",
        scores: { infantry: 2 }
      },
      {
        text:
          "The route that passes closest to another outpost.",
        scores: { healer: 2 }
      },
      {
        text:
          "None yet. I'm figuring out why part of this map is missing.",
        scores: { scribe: 2 }
      }
    ]
  },

  {
    question:
      "Someone you care about is in danger. You have seconds to decide what to do.",

    answers: [
      {
        text:
          "Assess what's happening before making things worse.",
        scores: { scribe: 2 }
      },
      {
        text:
          "Get to them. I'll deal with whatever happens next.",
        scores: { rider: 2 }
      },
      {
        text:
          "Figure out what they need and keep them alive.",
        scores: { healer: 2 }
      },
      {
        text:
          "Trust the plan and do exactly what I've been trained to do.",
        scores: { infantry: 2 }
      }
    ]
  },

  {
    question:
      "You've been assigned to a team of people you've never met. Without discussing it, which role do you naturally end up filling?",

    answers: [
      {
        text:
          "The one keeping track of what everyone else seems to have forgotten.",
        scores: {
          scribe: 2,
          infantry: 1
        }
      },
      {
        text:
          "The one people start coming to when something goes wrong.",
        scores: {
          healer: 2,
          scribe: 1
        }
      },
      {
        text:
          "The one saying, 'Okay, we're doing this,' when everyone gets stuck.",
        scores: {
          rider: 2,
          infantry: 1
        }
      },
      {
        text:
          "The one quietly figuring out how everyone works best together.",
        scores: {
          infantry: 2,
          healer: 1
        }
      }
    ]
  },

  {
    question:
      "You have an hour to kill before you're expected somewhere. Where do you end up?",

    answers: [
      {
        text:
          "Wandering somewhere I've never been before.",
        scores: { rider: 2 }
      },
      {
        text:
          "Sitting somewhere I can people-watch.",
        scores: { scribe: 2 }
      },
      {
        text:
          "Finding someone I know and dragging them along with me.",
        scores: { healer: 2 }
      },
      {
        text:
          "Getting there early. Apparently that's who I am.",
        scores: { infantry: 2 }
      }
    ]
  },

  {
    question:
      "What matters most when everything else is stripped away?",

    answers: [
      {
        text:
          "Knowledge. What you know can change everything.",
        scores: { scribe: 2 }
      },
      {
        text:
          "Courage. Someone has to be willing to go first.",
        scores: { rider: 2 }
      },
      {
        text:
          "People. None of it matters if there's no one left beside you.",
        scores: { healer: 2 }
      },
      {
        text:
          "Resolve. You keep going, especially when it's difficult.",
        scores: { infantry: 2 }
      }
    ]
  }

];


// ----------------------------------------
// TIE BREAKERS
// ----------------------------------------

const tieBreakers = {

  "rider-scribe": {
    question:
      "You reach a locked door no one warned you about. What bothers you more?",

    answers: [
      {
        text:
          "That I don't know what's behind it.",
        quadrant: "scribe"
      },
      {
        text:
          "That someone thought a locked door would stop me.",
        quadrant: "rider"
      }
    ]
  },

  "healer-rider": {
    question:
      "A dangerous opportunity could change everything, but someone else may pay the price if it goes wrong. What weighs heavier?",

    answers: [
      {
        text:
          "What happens if no one is willing to take the risk.",
        quadrant: "rider"
      },
      {
        text:
          "Whether I have the right to make that choice for someone else.",
        quadrant: "healer"
      }
    ]
  },

  "infantry-rider": {
    question:
      "Halfway through a mission, the original plan stops making sense. What earns your trust?",

    answers: [
      {
        text:
          "The plan. It was made for a reason.",
        quadrant: "infantry"
      },
      {
        text:
          "What I'm seeing in front of me right now.",
        quadrant: "rider"
      }
    ]
  },

  "healer-scribe": {
    question:
      "Someone comes to you with a problem they can't solve. What do you want first?",

    answers: [
      {
        text:
          "The entire story. Something important is probably missing.",
        quadrant: "scribe"
      },
      {
        text:
          "To know what they need from me right now.",
        quadrant: "healer"
      }
    ]
  },

  "infantry-scribe": {
    question:
      "You have enough information to act, but not enough to be certain. What happens next?",

    answers: [
      {
        text:
          "I keep looking. Missing information has consequences.",
        quadrant: "scribe"
      },
      {
        text:
          "I make the best decision I can and move.",
        quadrant: "infantry"
      }
    ]
  },

  "healer-infantry": {
    question:
      "The mission can still succeed, but only if someone is left behind. What matters most?",

    answers: [
      {
        text:
          "Completing what we came here to do.",
        quadrant: "infantry"
      },
      {
        text:
          "Finding another way. I'm not accepting that trade yet.",
        quadrant: "healer"
      }
    ]
  }

};


// ----------------------------------------
// RESULT CONTENT
// ----------------------------------------

const results = {

  rider: {
    title: "Riders Quadrant",

    description:
      "You don't wait for certainty. You trust your instincts, adapt quickly, and move when everyone else is still deciding. That tendency may serve you well in the Riders Quadrant.",

    orders:
      "Your orders: Report to the parapet. Survival remains your responsibility."
  },

  scribe: {
    title: "Scribe Quadrant",

    description:
      "You notice what others miss. You would rather understand the battlefield before stepping onto it, and you know information can be every bit as dangerous as a weapon.",

    orders:
      "Your orders: Report to the Archives. Try not to learn anything you're not supposed to know."
  },

  healer: {
    title: "Healers Quadrant",

    description:
      "When everything falls apart, you look for what can still be saved. You stay grounded under pressure and understand that strength isn't always the loudest thing in the room.",

    orders:
      "Your orders: Report to the infirmary. Something tells us you'll be busy."
  },

  infantry: {
    title: "Infantry Quadrant",

    description:
      "You're steady when things get difficult. Discipline, loyalty, and sheer determination carry you farther than impulse ever could.",

    orders:
      "Your orders: Report for training. Try to make it back in one piece."
  }

};


// ----------------------------------------
// ELEMENTS
// ----------------------------------------

const identityForm =
  document.getElementById("identity-form");

const candidateInput =
  document.getElementById("candidate-name");

const beginButton =
  document.getElementById("begin-assessment");

const questionText =
  document.getElementById("question-text");

const answerContainer =
  document.getElementById("answer-container");

const progress =
  document.getElementById("progress");

const quadrantResult =
  document.getElementById("quadrant-result");

const resultDescription =
  document.getElementById("result-description");

const resultOrders =
  document.getElementById("result-orders");

const restartButton =
  document.getElementById("restart-assessment");

const tieBreakerQuestion =
  document.getElementById("tiebreaker-question");

const tieBreakerAnswers =
  document.getElementById("tiebreaker-answers");

const placementRecord =
  document.querySelector(".placement-record");
  const shareButton =
  document.getElementById("share-assignment");

const shareStatus =
  document.getElementById("share-status");

let assignedQuadrant = "";


// ----------------------------------------
// SCREEN CONTROL
// ----------------------------------------

function showScreen(screenId) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  document
    .getElementById(screenId)
    .classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ----------------------------------------
// NAME ENTRY
// ----------------------------------------

identityForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    candidateName =
      candidateInput.value.trim();

    if (!candidateName) {
      return;
    }

    document
      .querySelectorAll(
        ".candidate-name-display"
      )
      .forEach(element => {
        element.textContent =
          candidateName;
      });

    showScreen("letter-screen");

  }
);


// ----------------------------------------
// BEGIN ASSESSMENT
// ----------------------------------------

beginButton.addEventListener(
  "click",
  function() {

    currentQuestion = 0;

    scores = {
      rider: 0,
      scribe: 0,
      healer: 0,
      infantry: 0
    };

    showScreen("quiz-screen");

    displayQuestion();

  }
);


// ----------------------------------------
// BUILD ANSWER BUTTON
// ----------------------------------------

function buildAnswerButton(
  text,
  numeral,
  onSelect
) {

  const button =
    document.createElement("button");

  button.type = "button";

  button.classList.add(
    "answer-button"
  );


  const number =
    document.createElement("span");

  number.classList.add(
    "answer-number"
  );

  number.textContent =
    `${numeral}.`;


  const answerText =
    document.createElement("span");

  answerText.classList.add(
    "answer-text"
  );

  answerText.textContent =
    text;


  const mark =
    document.createElement("span");

  mark.classList.add(
    "answer-mark"
  );

  mark.textContent = "✓";


  button.appendChild(number);

  button.appendChild(answerText);

  button.appendChild(mark);


  button.addEventListener(
    "click",
    function() {

      const parent =
        button.parentElement;

      parent
        .querySelectorAll(
          ".answer-button"
        )
        .forEach(choice => {
          choice.disabled = true;
        });

      button.classList.add(
        "selected"
      );

      setTimeout(
        onSelect,
        450
      );

    }
  );

  return button;
}


// ----------------------------------------
// DISPLAY QUESTION
// ----------------------------------------

function displayQuestion() {

  const question =
    questions[currentQuestion];

  progress.textContent =
    `FORM 04-A // ${String(
      currentQuestion + 1
    )} OF ${String(
      questions.length
    )}`;

  questionText.textContent =
    question.question;

  answerContainer.innerHTML = "";

  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV"
  ];

  question.answers.forEach(
    (answer, index) => {

      const button =
        buildAnswerButton(
          answer.text,
          romanNumerals[index],
          function() {

            applyScores(
              answer.scores
            );

            currentQuestion++;

            if (
              currentQuestion <
              questions.length
            ) {

              animateQuestionChange();

            } else {

              finishAssessment();

            }

          }
        );

      answerContainer.appendChild(
        button
      );

    }
  );

}


// ----------------------------------------
// QUESTION TRANSITION
// ----------------------------------------

function animateQuestionChange() {

  const questionArea =
    document.querySelector(
      "#quiz-screen .question-area"
    );

  questionArea.classList.add(
    "question-leaving"
  );

  setTimeout(function() {

    displayQuestion();

    questionArea.classList.remove(
      "question-leaving"
    );

    questionArea.classList.add(
      "question-entering"
    );

    setTimeout(function() {

      questionArea.classList.remove(
        "question-entering"
      );

    }, 350);

  }, 180);

}


// ----------------------------------------
// SCORING
// ----------------------------------------

function applyScores(answerScores) {

  Object.entries(answerScores)
    .forEach(
      ([quadrant, points]) => {

        scores[quadrant] +=
          points;

      }
    );

}


// ----------------------------------------
// FINISH ASSESSMENT
// ----------------------------------------

function finishAssessment() {

  showScreen(
    "processing-screen"
  );

  setTimeout(function() {

    const result =
      calculateResult();

    if (result) {
      displayResult(result);
    }

  }, 1500);

}


// ----------------------------------------
// CALCULATE RESULT
// ----------------------------------------

function calculateResult() {

  const highestScore =
    Math.max(
      ...Object.values(scores)
    );

  const winners =
    Object.keys(scores)
      .filter(
        quadrant =>
          scores[quadrant] ===
          highestScore
      );

  if (winners.length > 1) {

    displayTieBreaker(
      winners
    );

    return null;
  }

  return winners[0];
}


// ----------------------------------------
// DISPLAY TIE BREAKER
// ----------------------------------------

function displayTieBreaker(
  winners
) {

  showScreen(
    "tiebreaker-screen"
  );

  tieBreakerAnswers.innerHTML =
    "";

  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV"
  ];


  // TWO-WAY TIE

  if (winners.length === 2) {

    const key =
      [...winners]
        .sort()
        .join("-");

    const tieBreaker =
      tieBreakers[key];

    tieBreakerQuestion.textContent =
      tieBreaker.question;

    tieBreaker.answers.forEach(
      (answer, index) => {

        const button =
          buildAnswerButton(
            answer.text,
            romanNumerals[index],
            function() {

              displayResult(
                answer.quadrant
              );

            }
          );

        button.classList.add(
          "tiebreaker-answer"
        );

        tieBreakerAnswers.appendChild(
          button
        );

      }
    );

    return;
  }


  // THREE-WAY / FOUR-WAY TIE

  tieBreakerQuestion.textContent =
    "When everything goes wrong, what do you trust most?";

  const universalAnswers = {

    rider:
      "My instincts. Waiting can be more dangerous than acting.",

    scribe:
      "What I know. There's always something that explains what's happening.",

    healer:
      "The people beside me. We get through it together.",

    infantry:
      "My training. Panic doesn't get to make the decision."

  };

  winners.forEach(
    (quadrant, index) => {

      const button =
        buildAnswerButton(
          universalAnswers[
            quadrant
          ],
          romanNumerals[index],
          function() {

            displayResult(
              quadrant
            );

          }
        );

      button.classList.add(
        "tiebreaker-answer"
      );

      tieBreakerAnswers.appendChild(
        button
      );

    }
  );

}


// ----------------------------------------
// DISPLAY RESULT
// ----------------------------------------

function displayResult(quadrant) {
    assignedQuadrant = quadrant;

  const result =
    results[quadrant];

  quadrantResult.textContent =
    result.title;

  resultDescription.textContent =
    result.description;

  resultOrders.textContent =
    result.orders;

  placementRecord.classList.remove(
    "result-rider",
    "result-scribe",
    "result-healer",
    "result-infantry"
  );

  placementRecord.classList.add(
    `result-${quadrant}`
  );

  showScreen(
    "result-screen"
  );

}

// ========================================
// SHARE ASSIGNMENT
// ========================================

shareButton.addEventListener(
  "click",
  async function () {

    if (!assignedQuadrant) {
      return;
    }

    shareStatus.textContent =
      "Preparing placement record...";

    try {

      const imageBlob =
        await createShareCard();

      const fileName =
        `basgiath-${assignedQuadrant}-assignment.png`;

      const file =
        new File(
          [imageBlob],
          fileName,
          {
            type: "image/png"
          }
        );

      const shareText =
        `I was assigned to the ${results[assignedQuadrant].title}. ` +
        `Where would Basgiath place you? @sagewavewebdesign`;


      // ----------------------------------
      // MOBILE / NATIVE SHARE
      // ----------------------------------

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file]
        })
      ) {

        await navigator.share({
          title:
            "My Basgiath War College Assignment",

          text:
            shareText,

          files:
            [file]
        });

        shareStatus.textContent =
          "Assignment shared.";

        return;
      }


      // ----------------------------------
      // DESKTOP / UNSUPPORTED FALLBACK
      // ----------------------------------

      downloadShareCard(
        imageBlob,
        fileName
      );

      shareStatus.textContent =
        "Assignment card saved.";

    } catch (error) {

      if (
        error.name ===
        "AbortError"
      ) {

        shareStatus.textContent =
          "";

        return;
      }

      console.error(
        "Share failed:",
        error
      );

      shareStatus.textContent =
        "Unable to prepare assignment.";

    }

  }
);


// ========================================
// CREATE SHARE CARD
// ========================================

async function createShareCard() {

  // Wait for our Google Fonts to finish
  // loading before drawing the card.

  if (document.fonts) {
    await document.fonts.ready;
  }


  const canvas =
    document.createElement(
      "canvas"
    );

  /*
    1080 × 1350 = 4:5 portrait.

    Good for feed posts, messaging,
    saving to a phone, and sharing
    elsewhere.
  */

  canvas.width = 1080;
  canvas.height = 1350;

  const ctx =
    canvas.getContext("2d");


  // --------------------------------------
  // PAPER BACKGROUND
  // --------------------------------------

  const paperGradient =
    ctx.createLinearGradient(
      0,
      0,
      1080,
      1350
    );

  paperGradient.addColorStop(
    0,
    "#eee6d4"
  );

  paperGradient.addColorStop(
    0.62,
    "#d7c9aa"
  );

  paperGradient.addColorStop(
    1,
    "#c7b68f"
  );

  ctx.fillStyle =
    paperGradient;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // --------------------------------------
  // SUBTLE PAPER IMPERFECTIONS
  // --------------------------------------

  ctx.save();

  ctx.globalAlpha = 0.075;

  ctx.fillStyle =
    "#594a35";

  for (
    let i = 0;
    i < 150;
    i++
  ) {

    const x =
      Math.random() *
      canvas.width;

    const y =
      Math.random() *
      canvas.height;

    const size =
      Math.random() *
      1.8;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      size,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }

  ctx.restore();


  // --------------------------------------
  // DOCUMENT BORDER
  // --------------------------------------

  ctx.strokeStyle =
    "rgba(61, 51, 37, 0.55)";

  ctx.lineWidth = 2;

  ctx.strokeRect(
    42,
    42,
    996,
    1266
  );


  ctx.strokeStyle =
    "rgba(61, 51, 37, 0.20)";

  ctx.lineWidth = 1;

  ctx.strokeRect(
    56,
    56,
    968,
    1238
  );


  // --------------------------------------
  // COLLEGE SEAL
  // --------------------------------------

  try {

    const seal =
      await loadShareImage(
        "assets/images/basgiath-seal.png"
      );

    ctx.save();

    ctx.translate(
      540,
      180
    );

    ctx.rotate(
      -4 *
      Math.PI /
      180
    );

    ctx.drawImage(
      seal,
      -80,
      -80,
      160,
      160
    );

    ctx.restore();

  } catch (error) {

    console.warn(
      "Seal could not be added to share card.",
      error
    );

  }


  // --------------------------------------
  // DOCUMENT HEADER
  // --------------------------------------

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "alphabetic";

  ctx.fillStyle =
    "#29251e";

  ctx.font =
    '42px "Libre Caslon Display", Georgia, serif';

  ctx.fillText(
    "BASGIATH WAR COLLEGE",
    540,
    310
  );


  ctx.fillStyle =
    "#695638";

  ctx.font =
    '22px "IBM Plex Mono", monospace';

  ctx.fillText(
    "OFFICIAL PLACEMENT RECORD",
    540,
    355
  );


  // --------------------------------------
  // RULE
  // --------------------------------------

  ctx.strokeStyle =
    "rgba(67, 55, 36, 0.55)";

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.moveTo(
    170,
    405
  );

  ctx.lineTo(
    910,
    405
  );

  ctx.stroke();


  // --------------------------------------
  // CANDIDATE
  // --------------------------------------

  ctx.fillStyle =
    "rgba(41, 37, 30, 0.62)";

  ctx.font =
    '18px "IBM Plex Mono", monospace';

  ctx.fillText(
    "CANDIDATE",
    540,
    480
  );


  ctx.fillStyle =
    "#29251e";

  drawShareText(
    ctx,
    candidateName,
    540,
    555,
    820,
    58,
    '"Nothing You Could Do", cursive'
  );


  // --------------------------------------
  // RESULT LABEL
  // --------------------------------------

  ctx.fillStyle =
    "rgba(41, 37, 30, 0.62)";

  ctx.font =
    '18px "IBM Plex Mono", monospace';

  ctx.fillText(
    "PRELIMINARY ASSESSMENT RESULT",
    540,
    665
  );


  // --------------------------------------
  // QUADRANT RESULT
  // --------------------------------------

  const shareTitles = {

    rider:
      "RIDERS QUADRANT",

    scribe:
      "SCRIBE QUADRANT",

    healer:
      "HEALERS QUADRANT",

    infantry:
      "INFANTRY QUADRANT"

  };


  ctx.fillStyle =
    "#29251e";

  drawShareText(
    ctx,
    shareTitles[
      assignedQuadrant
    ],
    540,
    770,
    880,
    82,
    '"Libre Caslon Display", Georgia, serif'
  );


  // --------------------------------------
  // ASSIGNED STAMP
  // --------------------------------------

  ctx.save();

  ctx.translate(
    540,
    875
  );

  ctx.rotate(
    -5 *
    Math.PI /
    180
  );

  ctx.strokeStyle =
    "rgba(113, 60, 59, 0.78)";

  ctx.fillStyle =
    "rgba(113, 60, 59, 0.82)";

  ctx.lineWidth = 4;

  ctx.strokeRect(
    -120,
    -35,
    240,
    70
  );

  ctx.font =
    '30px "IBM Plex Mono", monospace';

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    "ASSIGNED",
    0,
    2
  );

  ctx.restore();


  // --------------------------------------
  // SHARE PROMPT
  // --------------------------------------

  ctx.textBaseline =
    "alphabetic";

  ctx.textAlign =
    "center";

  ctx.fillStyle =
    "#29251e";

  ctx.font =
    '34px "Libre Caslon Display", Georgia, serif';

  ctx.fillText(
    "Where would Basgiath place you?",
    540,
    1035
  );


  ctx.fillStyle =
    "rgba(41, 37, 30, 0.70)";

  ctx.font =
    '21px "Cormorant Garamond", Georgia, serif';

  ctx.fillText(
    "Take the assessment and share your assignment.",
    540,
    1080
  );


  // --------------------------------------
  // SAGEWAVE CREDIT
  // --------------------------------------

  ctx.strokeStyle =
    "rgba(67, 55, 36, 0.25)";

  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.moveTo(
    270,
    1150
  );

  ctx.lineTo(
    810,
    1150
  );

  ctx.stroke();


  ctx.fillStyle =
    "rgba(41, 37, 30, 0.68)";

  ctx.font =
    '19px "IBM Plex Mono", monospace';

  ctx.fillText(
    "@sagewavewebdesign",
    540,
    1205
  );


  ctx.fillStyle =
    "rgba(41, 37, 30, 0.48)";

  ctx.font =
    '16px "IBM Plex Mono", monospace';

  ctx.fillText(
    "UNOFFICIAL FAN EXPERIENCE",
    540,
    1248
  );


  // --------------------------------------
  // EXPORT PNG
  // --------------------------------------

  return new Promise(
    function (resolve, reject) {

      canvas.toBlob(
        function (blob) {

          if (blob) {

            resolve(blob);

          } else {

            reject(
              new Error(
                "Unable to create image."
              )
            );

          }

        },
        "image/png"
      );

    }
  );

}


// ========================================
// FIT TEXT TO CARD
// ========================================

function drawShareText(
  ctx,
  text,
  x,
  y,
  maxWidth,
  startingSize,
  fontFamily
) {

  let fontSize =
    startingSize;

  ctx.font =
    `${fontSize}px ${fontFamily}`;

  while (
    ctx.measureText(text).width >
      maxWidth &&
    fontSize > 28
  ) {

    fontSize -= 2;

    ctx.font =
      `${fontSize}px ${fontFamily}`;

  }

  ctx.fillText(
    text,
    x,
    y
  );

}


// ========================================
// LOAD SHARE IMAGE
// ========================================

function loadShareImage(src) {

  return new Promise(
    function (resolve, reject) {

      const image =
        new Image();

      image.onload =
        function () {
          resolve(image);
        };

      image.onerror =
        function () {
          reject(
            new Error(
              `Could not load ${src}`
            )
          );
        };

      image.src =
        src;

    }
  );

}


// ========================================
// DOWNLOAD FALLBACK
// ========================================

function downloadShareCard(
  blob,
  fileName
) {

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    fileName;

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();

  setTimeout(
    function () {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );

}


// ----------------------------------------
// RESTART
// ----------------------------------------

restartButton.addEventListener(
  "click",
  function() {

    candidateName = "";
    assignedQuadrant = "";

shareStatus.textContent = "";

    currentQuestion = 0;

    scores = {
      rider: 0,
      scribe: 0,
      healer: 0,
      infantry: 0
    };

    candidateInput.value = "";

    placementRecord.classList.remove(
      "result-rider",
      "result-scribe",
      "result-healer",
      "result-infantry"
    );

    showScreen(
      "identity-screen"
    );

  }
);