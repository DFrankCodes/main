class Arb {
    constructor(type, odds, stake) {
        if (!(type == "2" || type == "3")) {
            return;
        }
        if (
            !(typeof odds == "object" && odds.length >= 2 && odds.length <= 3)
        ) {
            return;
        }
        if (!stake * 1) {
            return;
        }

        this.type = new Number(type);
        this.odds = [];
        odds.forEach((odd) => {
            this.odds.push(odd);
        });
        this.stake = new Number(stake);
        this.isLoss = null;

        this.calc();
    }

    calc() {
        if (this.type == "2") {
            this.odd1 = {
                odd: this.odds[0],
                stake: null,
                returns: null,
                profit: null,
            };
            this.odd2 = {
                odd: this.odds[1],
                stake: null,
                returns: null,
                profit: null,
            };

            //Arb Percentage
            this.ptage = (1 / this.odd1.odd) * 100 + (1 / this.odd2.odd) * 100;

            //Individual Stakes
            this.odd1.stake =
                (this.stake * ((1 / this.odd1.odd) * 100)) / this.ptage;
            this.odd2.stake =
                (this.stake * ((1 / this.odd2.odd) * 100)) / this.ptage;

            //Returns and Profit for Individual staked
            //Returns
            this.odd1.returns = this.odd1.stake * this.odd1.odd;

            this.odd2.returns = this.odd2.stake * this.odd2.odd;

            //Profit
            this.odd1.profit = this.odd1.returns - this.stake;

            this.odd2.profit = this.odd2.returns - this.stake;

            //Arb Profit
            this.profit = (this.odd1.profit + this.odd2.profit) / 2;

            //Arb Profit Percentage
            this.profitPtage = (this.profit / this.stake) * 100;

            //Arb Returns
            this.returns = this.stake + this.profit;

            if (this.stake > this.returns) {
                this.isLoss = "y";
            } else if (this.stake == this.returns) {
                this.isLoss = "m";
            } else {
                this.isLoss = "n";
            }
        } else if (this.type == "3") {
            this.odd1 = {
                odd: this.odds[0],
                stake: null,
                returns: null,
                profit: null,
            };
            this.odd2 = {
                odd: this.odds[1],
                stake: null,
                returns: null,
                profit: null,
            };
            this.odd3 = {
                odd: this.odds[2],
                stake: null,
                returns: null,
                profit: null,
            };

            //Arb Percentage
            this.ptage =
                (1 / this.odd1.odd) * 100 +
                (1 / this.odd2.odd) * 100 +
                (1 / this.odd3.odd) * 100;

            //Individual Stakes
            this.odd1.stake =
                (this.stake * ((1 / this.odd1.odd) * 100)) / this.ptage;
            this.odd2.stake =
                (this.stake * ((1 / this.odd2.odd) * 100)) / this.ptage;
            this.odd3.stake =
                (this.stake * ((1 / this.odd3.odd) * 100)) / this.ptage;

            //Returns and Profit for Individual staked
            //Returns
            this.odd1.returns = this.odd1.stake * this.odd1.odd;

            this.odd2.returns = this.odd2.stake * this.odd2.odd;

            this.odd3.returns = this.odd3.stake * this.odd3.odd;

            //Profit
            this.odd1.profit = this.odd1.returns - this.stake;

            this.odd2.profit = this.odd2.returns - this.stake;

            this.odd3.profit = this.odd3.returns - this.stake;

            //Arb Profit
            this.profit =
                (this.odd1.profit + this.odd2.profit + this.odd3.profit) / 3;

            //Arb Profit Percentage
            this.profitPtage = (this.profit / this.stake) * 100;

            //Arb Returns
            this.returns = this.stake + this.profit;

            if (this.stake > this.returns) {
                this.isLoss = "y";
            } else if (this.stake == this.returns) {
                this.isLoss = "m";
            } else {
                this.isLoss = "n";
            }
        }
    }

    retvals() {
        if (this.type == "2") {
            return {
                type: this.type,
                stake: this.stake,
                returns: new Number(this.returns).toFixed(2),
                profit: new Number(this.profit).toFixed(2),
                profitPtage: this.profitPtage.toFixed(2),
                isLoss: this.isLoss,
                odds: [
                    {
                        odd: this.odd1.odd,
                        stake: this.odd1.stake.toFixed(2),
                        returns: this.odd1.returns.toFixed(2),
                        profit: this.odd1.profit.toFixed(2),
                    },
                    {
                        odd: this.odd2.odd,
                        stake: this.odd2.stake.toFixed(2),
                        returns: this.odd2.returns.toFixed(2),
                        profit: this.odd2.profit.toFixed(2),
                    },
                ],
            };
        } else if (this.type == "3") {
            return {
                type: this.type,
                stake: this.stake,
                returns: new Number(this.returns).toFixed(2),
                profit: new Number(this.profit).toFixed(2),
                profitPtage: this.profitPtage.toFixed(2),
                isLoss: this.isLoss,
                odds: [
                    {
                        odd: this.odd1.odd,
                        stake: this.odd1.stake.toFixed(2),
                        returns: this.odd1.returns.toFixed(2),
                        profit: this.odd1.profit.toFixed(2),
                    },
                    {
                        odd: this.odd2.odd,
                        stake: this.odd2.stake.toFixed(2),
                        returns: this.odd2.returns.toFixed(2),
                        profit: this.odd2.profit.toFixed(2),
                    },
                    {
                        odd: this.odd3.odd,
                        stake: this.odd3.stake.toFixed(2),
                        returns: this.odd3.returns.toFixed(2),
                        profit: this.odd3.profit.toFixed(2),
                    },
                ],
            };
        }
    }
}
