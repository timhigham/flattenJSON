	//assumes div element with id 'testoutput'	
	function testIt(){
		var sample=$.toJSON(
			{
				"hello":"tester",
				"checking":"not json string",
				"like":$.toJSON({"from nestedA":"a nested value","from nestedB":2,"deepnested":$.toJSON({"deepernestedA":"deepernestedAval","hello":"deepernestedBval"})})
			}
		);
		$("#testoutput").html(flattenJSON(sample));
	}
	testIt();