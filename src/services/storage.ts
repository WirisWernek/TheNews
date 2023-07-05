import AsyncStorage from '@react-native-async-storage/async-storage';
export default class StorageService{
	public async getData(campo: string){
		try {
		  const valor = await AsyncStorage.getItem(campo);
		  return valor;
		} catch (e) {
		 console.log(e)
		}
	  };

	  public async storeData (campo: string, valor: string){
		try {
		  await AsyncStorage.setItem(campo, valor);
		} catch (e) {
			console.log(e)
		}
	  };
}