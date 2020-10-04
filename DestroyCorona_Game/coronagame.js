var coronaNr 
var eatcount 
var coronanrelem 
var coronacountE 
var killedcorona 
var ladybugpic 
var ladybugimg 
var coronaT 
var coronaD 
var coronaS 
var bugS 
var budskap 
var bugpic 
var bugcompass 
var ndirec, mdirec
var clockR 
var clockS 

function startscreen () {
  ladybugpic = document.getElementById('bug')
  budskap = document.getElementById('message') 
  addListener(document, 'keydown', movecompass)
  bugpic = ['ladybug.png', 'ladybug_right.png', 'ladybug_down.png', 'ladybug_left.png']
  bugcompass = 1
  addListener(document.getElementById('newgame'), 'click', newgame)
  addListener(document.getElementById('endgame'), 'click', end)
  ndirec = 5
  mdirec = 5
  clockR = null
  clockS = 20
  ladybugimg = document.getElementById('corona')
  coronaT = null
  coronaD = 2000
  bugS = 40
  coronaS = 80
  coronanrelem = document.getElementById('coronanumber')
  coronacountE = document.getElementById('coronacounter')
}
addListener(window, 'load', startscreen)

function movecompass (e) {
  var j = e.keyCode
  switch (j) {
    case 37:
    case 90:
      bugcompass--
      if (bugcompass < 0) { bugcompass = 3 }
      ladybugpic.src = bugpic[bugcompass]
      break
    case 39:
    case 173:
      bugcompass++
      if (bugcompass > 3) { bugcompass = 0 }
      ladybugpic.src = bugpic[bugcompass]
      break
  }
}
function newgame () { 
  ladybugpic.style.left = '0px'
  ladybugpic.style.top = '0px'
  walkLadybug()
  coronaNr = 0
  eatcount = 0
  coronanrelem.innerHTML = coronaNr
  coronacountE.innerHTML = eatcount
  killedcorona = true
  coronaT = setTimeout(NewCorona, coronaD)
}

function end () { 
  if (clockR != null) { clearTimeout(clockR) }
  clearTimeout(coronaT)
  alert('Bravo! you helped Captain SuperLadyBug and the World against Corona! Start Game to Play Again!')
  ladybugimg.style.visibility = 'hidden'
}

function walkLadybug () {
  var m
  var n
  m = parseInt(ladybugpic.style.left)
  n = parseInt(ladybugpic.style.top)
  switch (bugcompass) {
    case 0:
      n -= mdirec
      if (n < 0) { n = 0 }
      break
    case 1:
      m += ndirec
      if (m > 720) { m = 720 }
      break
    case 2:
      n += mdirec
      if (n > 420) { n = 420 }
      break
    case 3:
      m -= ndirec
      if (m < 0) { m = 0 }
      break
  }
  ladybugpic.style.left = m + 'px'
  ladybugpic.style.top = n + 'px'
  clockR = setTimeout(walkLadybug, clockS)
  Score()
}
function NewCorona () { 
  if (coronaNr < 1000) {
    var a
    var b
    a = Math.floor(440 * Math.random()) + 20
    b = Math.floor(740 * Math.random()) + 20
    ladybugimg.style.top = a + 'px'
    ladybugimg.style.left = b + 'px'
    ladybugimg.src = 'coronavirus.png'
    ladybugimg.style.visibility = 'visible'
    coronaT = setTimeout(NewCorona, coronaD)
    coronaNr++
    coronanrelem.innerHTML = coronaNr
    killedcorona = false
  } else end()
}
function Score () { 
  if (killedcorona) {
    return
  }
  var ne
  var nw 
  var se 
  var sw 
  ne = parseInt(ladybugimg.style.top)
  se = parseInt(ladybugpic.style.top)
  sw = parseInt(ladybugpic.style.left)
  nw = parseInt(ladybugimg.style.left)

  if (sw + coronaS - 20 >= nw && sw + 20 <= nw + bugS &&
     se + coronaS - 20 >= ne && se + 20 <= ne + bugS) {
    clearTimeout(coronaT)
    ladybugimg.src = 'coronavirusdead.png'
    coronaT = setTimeout(NewCorona, coronaD)
    eatcount++
    coronacountE.innerHTML = eatcount
    killedcorona = true
  }
}
