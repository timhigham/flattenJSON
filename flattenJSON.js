	/**
	*	'flattenJSON'
	*	processes a string to ensure no nested json data is present, all key values are on at one level
	*	WARNING:
	*		duplicate keys get overwritten by other recurring key/values
	*		Keys referring to nested json are dropped as a flat level json makes them irrelevant
	*	@include http://jquery-json.googlecode.com/files/jquery.json-2.4.min.js
	*	@param string jsonIn the json string to simplify
	*	@param boolean isRecurrence control as function might call itself if it finds nested json
	*	@return string jsonOut the simplfied JSON string with no nested JSON
	**/
	this.flattenJSON=function(jsonIn,isRecurrence){
		//recursively strip out JSON objects by calling this function if data is found to be JSON
		var 
				result={},
				jsonItem,
				jsonAsObject=$.parseJSON(jsonIn),
				jsonTest,
				nestedParse;
		if(isRecurrence==undefined){isRecurrence=false;}
		else{isRecurrence=true;}
		for(var j in jsonAsObject){
			jsonItem=jsonAsObject[j];
			//check if item is not actually nested json
			if(isNaN(jsonItem)&&(jsonItem.count("{"))!=0&&(jsonItem.count("{")==jsonItem.count("}"))){
				try{
					jsonTest=$.parseJSON(jsonAsObject[j]);//force real jsonTest to attempt to trigger catch
					nestedParse=this.flattenJSON(jsonAsObject[j],true);//item passed as json so needs parsing itself
					for(var n in nestedParse){
						result[n]=nestedParse[n];
					}
				}			
				catch(e){
					result[j]=jsonAsObject[j];
				}
			}
			else{
				result[j]=jsonAsObject[j];
			}
		}
		if(!isRecurrence){
			result=$.toJSON(result);
		}
		else{
		}
		return result;
	}