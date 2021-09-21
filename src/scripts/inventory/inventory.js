(function () {

    var Global = {
        tryGlobal : true,
    };


    class character {
        constructor(name, middleName, lastName) {
            this.name = name;
            this.middleName = middleName;
            this.lastName = lastName
        }
    
        // Adding a method to the constructor
        greet() {
            return `${this.name} says hello.`;
        }
    }
    class player extends character {
        constructor(name, middleName, lastName, money, mood, fatigue, libido) {
            // Chain constructor with super
            super(name, middleName, lastName);

            // Add a new property
            this.money = money;
            this.mood = mood
            this.fatigue = fatigue
            this.libido = libido
        }
    }

    class npc extends character {
        constructor(name, middleName, lastName, color) {
            // Chain constructor with super
            super(name, middleName, lastName);

            // Add a new property
            this.color = color;
        }
    }
Macro.add('newnpc', {
   skipArgs: true,
   tags: [],
   handler: function () {
       try {
           var nm = new npc(this.args[0], this.args[1], this.args[2], this.args[3])
           console.log(nm)
       }
       catch (ex) {
           return this.error('i dont know what happened send the error message in the discord: ' + ex.message);
       }
   }
});
if (Global.tryGlobal) {
    window.character = window.character || character;
}

}());