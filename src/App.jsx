import React, { Component } from "react";
import Skill from "./components/Skill";
import "./styles/App.css";

class App extends Component {
    state = {
        skills: [
            {
                id: 0,
                name: "Czytanie",
                description: "aaaaaa",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 1,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 2,
                name: "Gra",
                description: "aaaaaa",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 3,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 1,
                requirements: []
            },
            {
                id: 4,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 2,
                requirements: [0]
            },
            {
                id: 5,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 2,
                requirements: [0, 1]
            },
            {
                id: 6,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 2,
                requirements: [1, 2]
            },
            {
                id: 7,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 2,
                requirements: [2, 3]
            },
            {
                id: 8,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 2,
                requirements: [3]
            },
            {
                id: 9,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 3,
                requirements: [4, 5]
            },
            {
                id: 10,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 3,
                requirements: [5, 6]
            },
            {
                id: 11,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 3,
                requirements: [6, 7]
            },
            {
                id: 12,
                name: "Pisanie",
                description: "aaaaaaa",
                unlocked: false,
                depth: 3,
                requirements: [7, 8]
            }
        ],
        maximumSkillPoints: 5,
        currentSkillPoints: 0,
        ownedSkills: [],
        depthReached: 0
    };

    handleLock = (skill, cannotBeUnlocked) => {
        const skills = [...this.state.skills];

        //unlock skill
        if (skill.unlocked) {
            const currentSkillPoints = this.state.currentSkillPoints - 1;
            this.setState({ currentSkillPoints });
            skill.unlocked = !skill.unlocked;
            skills[skill.id] = skill;

            let ownedSkills = [...this.state.ownedSkills];

            ownedSkills.map((mapedSkill, i) => {
                if (mapedSkill === skill.id) {
                    ownedSkills[i] = null;
                }
                return null;
            });
            ownedSkills = ownedSkills.filter(id => {
                if (id === 0) return "0";
                else return id != null;
            });
            this.setState({ ownedSkills });

            let depthRemoved = true;
            this.state.skills.map((playerSkill, i) => {
                if (
                    skill.id !== playerSkill.id &&
                    skill.depth === this.state.depthReached &&
                    skill.unlocked === true
                )
                    depthRemoved = false;
                return null;
            });

            if (depthRemoved) {
                let depthReached = this.state.depthReached - 1;
                this.setState({ depthReached });
            }

            this.setState({ skills });
        } else if (!cannotBeUnlocked) {
            //lock skill
            const currentSkillPoints = this.state.currentSkillPoints + 1;
            if (currentSkillPoints <= this.state.maximumSkillPoints) {
                this.setState({ currentSkillPoints });
                skill.unlocked = !skill.unlocked;
                skills[skill.id] = skill;

                const ownedSkills = [skill.id, ...this.state.ownedSkills];
                this.setState({ ownedSkills });

                const depthReached = skill.depth;
                this.setState({ depthReached });

                this.setState({ skills });
            }
        } else {
            //skill cannot be unlocked as it requires preceeding skills
        }
    };

    render() {
        return (
            <div>
                Remaining Skill Points:{" "}
                {this.state.maximumSkillPoints - this.state.currentSkillPoints}
                <div className="skills">
                    <br />
                    {this.state.skills.map(skill => {
                        return (
                            <Skill
                                key={skill.id}
                                skill={skill}
                                unlockedSkills={this.state.ownedSkills}
                                hidden={
                                    skill.depth > this.state.depthReached + 1
                                        ? true
                                        : false
                                }
                                handleLock={this.handleLock}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default App;
