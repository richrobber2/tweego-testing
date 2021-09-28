(function () {
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()

        const achievements = [{
                id: 1,
                achievementname: 'play game',
                info: {
                    description: "you got this achievement by launching and starting the game for the first time",
                    unlocked: false
                }
            },
            {
                id: 2,
                achievementname: 'more test',
                info: {
                    description: "short",
                    unlocked: true
                }
            },
        ]

        function showachievements(number) {
            achievements.forEach(element => {
                console.log("show achievements has been run")
                return element.achievementname
            });
        }

        function ShowUnlockedAchievements(number) {
            achievement.forEach(element => {
                if (element.unlocked == true) {
                    return element.name
                }
            });
        }

        Macro.add('checkunlocked', {
            skipArgs: true,
            handler: function () {
                try {
                    for (var {
                            achievementname: n,
                            id: i,
                            info: {
                                description: p,
                                unlocked: h
                            }
                        } of achievements) {
                        if (h == true) {
                            switch (i) {
                                case 1:
                                    
                                    break;

                                default:
                                    break;
                            }
                        }
                        console.log('Achievement Name: ' + n + ', Achievement description: ' + p);
                    }
                } catch (ex) {
                    return this.error('bad conditional expression: ' + ex.message);
                }
            }
        });

        Macro.add('checkunlocked', {
            skipArgs: true,
            handler: function () {
                try {
                    
                } catch (err) {
                    
                }
            }
        });
        function testing() {
            console.log(achievements.values())
        }
        testing()
});