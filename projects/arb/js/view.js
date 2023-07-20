form.addEventListener("submit", (e) => {
	if (typeof results == "string") {
		error.innerText = results;
		return;
	} else {
		error.innerText = "";
	}

	data = "";
	let i = 1;
	results.odds.forEach((odd) => {
		data +=
		"<tr>\n<td>" +
		i +
		" </td>\n" +
		"<td>" +
		odd.odd +
		"</td>\n" +
		"<td>&#x20A6;" +
		numdiv(odd.stake) +
		"</td>\n" +
		"<td class='isLoss'>&#x20A6;"+
		numdiv(odd.returns) +
		"</td>\n" +
		"<td class='isLoss'>&#x20A6;"+
		numdiv(odd.profit) +
		"</td>\n" +
		"</tr>";
		i++;
	});
	data +=
	"<tr><th  colspan=3>Average Returns</th><td class='isLoss' colspan=2>&#x20A6;" +
	numdiv(results.returns) +
	"</td></tr>";
	data +=
	"<tr><th colspan=3>Average Profit</th><td class='isLoss' colspan=2>&#x20A6;" +
	numdiv(results.profit) +
	"</td></tr>";
	data +=
	"<tr><th colspan=3>Profit Percentage</th><td class='isLoss' colspan=2>" +
	results.profitPtage +
	"%</td></tr>";

	output.innerHTML = data;
	isLossEls = document.querySelectorAll("*.isLoss");
	if (results.isLoss == "n") {
		isLossEls.forEach((isLossEl) => {
			isLossEl.classList.add("isProfit");
		});
		status.innerText = "Profit !!!";
	} else if (results.isLoss == "m") {
		isLossEls.forEach((isLossEl) => {
			isLossEl.classList.add("isNone");
		});
		status.innerText = "No Profit !  No Loss !";
	} else {
		isLossEls.forEach((isLossEl) => {
			isLossEl.classList.remove("isProfit");
		});
		isLossEls.forEach((isLossEl) => {
			isLossEl.classList.remove("isNone");
		});
		status.innerText = "Loss !";
	}
});