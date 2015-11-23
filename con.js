function neighbours(M, i, j){
	count = 0
	N =[[i-1, j-1],
		[i-1, j],
		[i-1, j+1],
		[i, j-1],
		[i, j+1],
		[i+1, j-1],
		[i+1, j],
		[i+1, j+1]]
 
	for(a=0;a<8; a++){
		i = N[a][0]
		j = N[a][1]
 
	       
		if(M[i] !== undefined){
			if(M[i][j] !== undefined){
				if(M[i][j] === 1){
					count++
				}
			}
		}
	       
	}

	return count
}


function setMatrix(){
	NewArr = []
	for(i = 0; i<Rows; i++){
		NewArr.push([])
		for(j=0;j<Cols; j++){
			NewArr[i].push(0)
		}
	}
	return NewArr
}

function step(A){
	B = setMatrix()

	for(i=0; i<A.length;i++){
		for(j=0; j<A[0].length;j++){
			cell = A[i][j]
			n = neighbours(A,i,j)
			if(cell === 1){
				if(n > 3){
					B[i][j] = 0
				}
				else if(n < 2){
					B[i][j] = 0
				}
				else{
					B[i][j] = 1
				}
			}
			else if((cell === 0) && (n == 3)){
				B[i][j] = 1
			}
		}
	}

	return B

}



Cols=10
Rows=10


A=[
	[0,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
]
print(neighbours(A,2,1))
print(step(A).join("\n"))