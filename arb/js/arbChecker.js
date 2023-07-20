function filterArbData(arbType, odds, stake) {
	if (arbType != 2 && arbType != 3) {
		return "Invalid Arb Type!"
	}
	if (odds.length != arbType) {
		return "Invalid Number if Odds Supplied!"
	}
	for(i = 0; i < odds.length; i++) {
		odd = odds[i]
		if (!(odd * 1) || odd == "") {
			return "All Odds must be Numbers or Decimals!"
			break;
		}
	}
	if (!(stake * 1) || stake == "") {
		return "Your Stake must be a Number or Decimal!"
	}
	return true;
}