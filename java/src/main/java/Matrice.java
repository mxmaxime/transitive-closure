class Matrice {

	int[][] matrice;
	public Matrice(int[][] matrice_){
		
		matrice = matrice_;
	}

	public Matrice Multiplication(Matrice matrice_){

		int[][] matriceR = new int[matrice.length][matrice.length];
		int c;
		int l = 0;

		for(int i=0; i<matrice.length; i++){
	    	c = 0;
            for(int j=0; j<matrice_.getTab()[0].length; j++){

            	int calcul= 0;
                for(int k=0; k<matrice_.getTab().length; k++){
                	
                    calcul += this.getCase(i, k) * matrice_.getCase(k, j);
                }
                matriceR[l][c] = calcul;
                c++;
            }
            l++;
	    }
		return new Matrice(matriceR);
	}

	public Matrice MultiplicationBool(Matrice matrice_){

		Matrice matriceResult = this.Multiplication(matrice_);

		for(int i=0; i<matriceResult.getTab().length; i++){

			for(int j=0; j<matriceResult.getTab()[0].length; j++){

				if(matriceResult.getCase(i, j) != 0){

					matriceResult.setCase(i, j, 1);
				}
			}
		}

		return matriceResult;
	}

	public boolean Equals(Matrice matrice_){
		
		if(this.getTab().length != matrice_.getTab().length || this.getTab()[0].length != matrice_.getTab()[0].length){

			return false;
		}
		else{

			for(int i=0; i<this.getTab().length; i++){

				for(int j=0; j<this.getTab()[0].length; j++){

					if(this.getCase(i, j) != matrice_.getCase(i, j)){

						return false;
					}
				}
			}
		}

		return true;
	}

	public int getCase(int i_, int j_){

		return matrice[i_][j_];
	}

	public void setCase(int i_, int j_, int value_){

		matrice[i_][j_] = value_;
	}

	private int[][] getTab(){

		return matrice;
	}

	public void AfficheMatrice(){

		for(int i=0; i<matrice.length; i++){
			for(int j=0; j<matrice[0].length; j++){

				System.out.print(matrice[i][j] + " ");
			}
			System.out.println("");
		}
	}
}