new Vue({
  el: '#app',
  data(){
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameRunning: false,
      turns: []
    }
  },
  methods: {
    startGame() {
      this.gameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage}`
      });
      if(this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    specialAttack() {
      let damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster hard for ${damage}`
      });
      if(this.checkWin()) {
        return;
      }

      this.monsterAttacks();
    },
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      });
      this.checkWin();
    },
    heal() {
      let health = Math.max(Math.floor(Math.random() * 15) + 1, 7);
      if(this.playerHealth <= 90) {
        this.playerHealth += health;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for ${health}`
      });
      this.monsterAttacks();
    },
    giveUp() {
      this.gameRunning = false;
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if(this.monsterHealth <= 0) {
        if(confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameRunning = false;
        }
        return true;
      } else if(this.playerHealth <= 0) {
        if(confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});