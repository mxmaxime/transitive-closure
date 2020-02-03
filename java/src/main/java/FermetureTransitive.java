class FermetureTransitive{

	Matrice[] tabMatrice;

	public FermetureTransitive(int[][] matrice_){

		tabMatrice = new Matrice[10];
		tabMatrice[0] = new Matrice(matrice_);

		tabMatrice[1] = tabMatrice[0].Multiplication(tabMatrice[0]);
		int i=2;

		do{
			tabMatrice[i] = tabMatrice[i-1].Multiplication(tabMatrice[0]);
			i++;
		}while(i<10 || !tabMatrice[i].equals(tabMatrice[i-1]));
	}

	public Matrice[] getMatrice(){

		return tabMatrice;
	}
}