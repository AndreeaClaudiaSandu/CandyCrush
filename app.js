
	const grid=document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const movesDisplay = document.getElementById('moves')
	const levelDisplay = document.getElementById('level')
	const scoreNext = document.getElementById('scoree')
	const width=8;
	const squares=[]
	let score=0
	let moves=20
	let level=1
	scoreDisplay.innerHTML=score
	movesDisplay.innerHTML=moves
	levelDisplay.innerHTML=level
	const candyColors=[ 'url(poze/red-candy.png)', 'url(poze/yellow-candy.png)', 'url(poze/orange-candy.png)', 'url(poze/purple-candy.png)purple', 'url(poze/green-candy.png)', 'url(poze/blue-candy.png)']

	
	function createBoard(){
		for(let i=0; i<width*width;i++){
			const square= document.createElement('div')
			square.setAttribute('draggable',true)
			square.setAttribute('id',i)
			let randomColor= Math.floor(Math.random() * candyColors.length)
			square.style.backgroundImage=candyColors[randomColor]
			grid.appendChild(square)
			squares.push(square)
		}
	}
	
	

	createBoard()
	
	let colorBeingDragged
	let colorBeingReplaced
	let squareIdBeingDragged
	let squareIdBeingReplaced
	
	
	squares.forEach(square => square.addEventListener('dragstart',dragStart))
	squares.forEach(square => square.addEventListener('dragend', dragEnd))
	squares.forEach(square => square.addEventListener('dragover', dragOver))
	squares.forEach(square => square.addEventListener('dragenter', dragEnter))
	squares.forEach(square => square.addEventListener('dragleave', dragLeave))
	squares.forEach(square => square.addEventListener('drop', dragDrop))
	
	function dragStart(){
		colorBeingDragged=this.style.backgroundImage
		squareIdBeingDragged= parseInt(this.id)
		console.log(colorBeingDragged)
		console.log(this.id, 'dragstart')
	}
	function dragOver(e){
		e.preventDefault()
		console.log(this.id, 'dragover')
	}
	function dragEnter(e){
		e.preventDefault()
		console.log(this.id, 'dragenter')
	}
	function dragLeave(){
		console.log(this.id, 'dragleave')
	}
	function dragEnd(){
		console.log(this.id, 'dragend')
		
		let validMoves=[squareIdBeingDragged -1, 
						squareIdBeingDragged -width,
						squareIdBeingDragged+1,
						squareIdBeingDragged+width]
						
		let validMove=validMoves.includes(squareIdBeingReplaced)
		
		if(squareIdBeingReplaced && validMove){
			squareIdBeingReplaced=null
		}else if(squareIdBeingReplaced && !validMove){
			squares[squareIdBeingReplaced].style.backgroundImage=colorBeingReplaced
			squares[squareIdBeingDragged].style.backgroundImage=colorBeingDragged
		}else 
			squares[squareIdBeingDragged].style.backgroundImage=colorBeingDragged
	}
	
	function dragDrop(){
		console.log(this.id, 'dragdrop')
		colorBeingReplaced=this.style.backgroundImage
		squareIdBeingReplaced=parseInt(this.id)
		this.style.backgroundImage=colorBeingDragged
		squares[squareIdBeingDragged].style.backgroundImage=colorBeingReplaced
		
		//adaugat de mine
		let scor= score
		checkRowForFive()
		checkColumnForFive()
		checkRowForFour()
		checkColumnForFour()
		checkRowForThree()
		checkColumnForThree()
		if(scor ==score){
			squares[squareIdBeingReplaced].style.backgroundImage=colorBeingReplaced
			squares[squareIdBeingDragged].style.backgroundImage=colorBeingDragged
		}else{
			moves-=1
			movesDisplay.innerHTML=moves
		}
			
		
	}
	
	
	/*function moveDown(){
		for(i=0;i<55;i++){
			if(squares[i+width].style.backgroundImage === ''){
				squares[i+width].style.backgroundImage=squares[i].style.backgroundImage
				squares[i].style.backgroundImage=''
				
				const firstRow=[0,1,2,3,4,5,6,7]
				const isFirstRow=firstRow.includes(i)
				if(isFirstRow && squares[i].style.backgroundImage===''){
					let randomColor= Math.floor(Math.random() * candyColors.length)
					squares[i].style.backgroundImage=candyColors[randomColor]
				}
			}
		}
		
	}
	*/
	function moveDown(){
		
		for(i=63;i>7;i--){
			if(squares[i].style.backgroundImage === ''){
				for(j=i;j>7;j-=width){
					squares[j].style.backgroundImage=squares[j-width].style.backgroundImage
				}
				let randomColor= Math.floor(Math.random() * candyColors.length)
				squares[j].style.backgroundImage=candyColors[randomColor]	
			}		
		}
		
		for(i=0;i<8;i++){
			if(squares[i].style.backgroundImage === ''){
				
				let randomColor= Math.floor(Math.random() * candyColors.length)
				squares[i].style.backgroundImage=candyColors[randomColor]
			
			}
		}
		
	}
	
	function checkRowForFive(){
		
			for(i=0;i<60;i++){
				let rowOfFive=[i,i+1,i+2,i+3,i+4]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				const notValid=[4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55]
				if(notValid.includes(i)) continue
				
				if(rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=5
					scoreDisplay.innerHTML=score
					rowOfFive.forEach(index => {
						squares[index].style.backgroundImage=''
					})
					squares[i].style.backgroundImage='url(poze/bomb.png)'
				}

			}
		
	}
	
	function checkColumnForFive(){
		
			for(i=0;i<=31;i++){
				let columnOfFive=[i,i+width,i+width*2, i+width*3, i+width*4]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				if(columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=5
					scoreDisplay.innerHTML=score
					columnOfFive.forEach(index => {
						squares[index].style.backgroundImage=''
					})
					squares[i].style.backgroundImage='url(poze/bomb.png)'
				}

			}
		
	}
	
	function checkRowForFour(){
		
			for(i=0;i<=60;i++){
				let rowOfFour=[i,i+1,i+2,i+3]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
				if(notValid.includes(i)) continue
				
				if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=4
					scoreDisplay.innerHTML=score
					rowOfFour.forEach(index => {
						squares[index].style.backgroundImage=''
					})
					
				}

			}
		
	}
	
	
	function checkColumnForFour(){
		
			for(i=0;i<=39;i++){
				let columnOfFour=[i,i+width,i+width*2, i+width*3]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=4
					scoreDisplay.innerHTML=score
					columnOfFour.forEach(index => {
						squares[index].style.backgroundImage=''
					})
					
				}

			}
		
	}
	
	
	
	function checkRowForThree(){
		
			for(i=0;i<=61;i++){
				let rowOfThree=[i,i+1,i+2]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55]
				if(notValid.includes(i)) continue
				
				if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=3
					scoreDisplay.innerHTML=score
					rowOfThree.forEach(index => {
						squares[index].style.backgroundImage=''
					})
				}

			}
		
	}
	
	
	function checkColumnForThree(){
		
			for(i=0;i<=47;i++){
				let columnOfThree=[i,i+width,i+width*2]
				let decidedColor = squares[i].style.backgroundImage
				const isBlank= squares[i].style.backgroundImage === ''
				
				if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
					score+=3
					scoreDisplay.innerHTML=score
					columnOfThree.forEach(index => {
						squares[index].style.backgroundImage=''
					})
				}

			}
		
	}
	
	function checkForBomb(){
		for(i=0;i<64;i++){
			if(squares[i].style.backgroundImage ===  'url("poze/bomb.png")' ){
				setTimeout(function(){
					emptyBoard()
					fillingBoard()},1000)
				score+=64
				scoreDisplay.innerHTML=score	
			}
		}
	}
	
	/*for(j=i-(i%8);j<i-(i%8)+8;j++)
					squares[j].style.backgroundImage=''
				score+=8
				scoreDisplay.innerHTML=score
				*/
				//for(k=i%8;k<=i%8+56;k+=8)
				//	squares[k].style.backgroundImage=''
	
	function fillingBoard(){
		for(i=0;i<64;i++){
			let randomColor= Math.floor(Math.random() * candyColors.length)
			squares[i].style.backgroundImage=candyColors[randomColor]
		}
	}
	
	var myVar =window.setInterval(function(){
		moveDown()
		stop()
		
	},100)
	
	window.setInterval(function(){
		
		checkRowForFive()
		checkColumnForFive()
		checkRowForFour()
		checkColumnForFour()
		checkRowForThree()
		checkColumnForThree()
		
	},500)
	
	window.setInterval(function(){
		checkForBomb()
		
	},1000)
	
	function emptyBoard(){
		for(i=0;i<64;i++){
			squares[i].style.backgroundImage = ''
		}
	}
	
	function stop(){
		if(moves===0){
			if(score>(100+50*level)){      
				clearInterval(myVar)
				emptyBoard()
				document.getElementById("score-level").style.visibility="visible"
				scoreNext.innerHTML=score
				if(score>=100+50*level+200){
					document.getElementById("star1y").style.visibility="visible"
					document.getElementById("star2y").style.visibility="visible"
					document.getElementById("star3y").style.visibility="visible"
					document.getElementById("next").style.visibility= "visible"
				}
				else if(score>=100+50*level+100){
					document.getElementById("star1y").style.visibility="visible"
					document.getElementById("star2y").style.visibility="visible"
					document.getElementById("star3g").style.visibility="visible"
					document.getElementById("next").style.visibility= "visible"
				}
				else{
					document.getElementById("star1y").style.visibility="visible"
					document.getElementById("star2g").style.visibility="visible"
					document.getElementById("star3g").style.visibility="visible"
					document.getElementById("next").style.visibility= "visible"
				}
			}
			else{
				clearInterval(myVar)
				emptyBoard()
				document.getElementById("restart").style.visibility= "visible"
			}	
		}
	}
	
	//document.getElementById("next").onclick=nextLevel()
				
	
	function nextLevel(){
		document.getElementById("star1y").style.visibility= "hidden"
		document.getElementById("star1g").style.visibility= "hidden"
		document.getElementById("star2y").style.visibility= "hidden"
		document.getElementById("star2g").style.visibility= "hidden"
		document.getElementById("star3y").style.visibility= "hidden"
		document.getElementById("star3g").style.visibility= "hidden"
		document.getElementById("next").style.visibility= "hidden"
		document.getElementById("score-level").style.visibility="hidden"
		level=level+1
		score=0
		moves=(15+level*5)
		scoreDisplay.innerHTML=score
		movesDisplay.innerHTML=moves
		levelDisplay.innerHTML=level
		var myVar =window.setInterval(function(){
			moveDown()
			stop()
		},100)
		
	}
	
	function restart(){
		document.getElementById("restart").style.visibility= "hidden"
		score=0
		moves=(15+level*5)
		scoreDisplay.innerHTML=score
		movesDisplay.innerHTML=moves
		levelDisplay.innerHTML=level
		var myVar =window.setInterval(function(){
			moveDown()
			stop()
		},100)
		
	}
	
	function restart2(){
		emptyBoard()
		score=0
		moves=(15+level*5)
		scoreDisplay.innerHTML=score
		movesDisplay.innerHTML=moves
		levelDisplay.innerHTML=level
		var myVar =window.setInterval(function(){
			moveDown()
			stop()
		},100)
		
	}
