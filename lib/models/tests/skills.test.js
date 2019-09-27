import { getSkillsValues, getSkillsLabels } from '../skills';
import { getSkills } from '../../../web/selectors/skills';
describe('lib | models | skills', () => {
  it('should get skills array of object ', () => {
    const state = {
      skills: {
        data: {
          java: 'JAVA',
          php: 'PHP',
          angular: 'ANGULAR',
          symfony: 'SYMFONY',
          react: 'REACT',
        }
      },
    };
    const resume = { skills: ['java', 'php', 'angular'] };
    expect(getSkillsLabels(getSkills(state), resume)).toEqual(['JAVA', 'PHP', 'ANGULAR'  ]);
  });
});
