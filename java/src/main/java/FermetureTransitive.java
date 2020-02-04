import java.util.List;
import java.util.ArrayList;

class FermetureTransitive{

	List<Matrice> listeMatrice = new ArrayList<Matrice>();
	double seconds;

	public FermetureTransitive(int[][] matrice_){

		listeMatrice.add(new Matrice(matrice_));

		double tempsDebut = System.currentTimeMillis();
		listeMatrice.add(listeMatrice.get(listeMatrice.size()-1).MultiplicationBool(listeMatrice.get(0)));

		do{
			listeMatrice.add(listeMatrice.get(listeMatrice.size()-1).MultiplicationBool(listeMatrice.get(listeMatrice.size()-2)));

		}while(listeMatrice.get(listeMatrice.size()-1).equals(listeMatrice.get(listeMatrice.size()-2)));
		double tempsFin = System.currentTimeMillis();
		seconds = (tempsFin - tempsDebut) / 1000F;
	}

	public List<Matrice> getMatrice(){

		return listeMatrice;
	}

	public double getTime(){

		return seconds;
	}
}