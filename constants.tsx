
import { ChildProfile, NenType } from './types';

export const MOCK_CHILDREN: ChildProfile[] = [
  {
    id: '1',
    name: 'Gon',
    age: 12,
    region: 'Whale Island',
    traits: ['Energetic', 'Highly Observant', 'Compassionate', 'Resilient'],
    bio: 'Gon is an exceptionally gifted and pure-hearted child with a deep connection to the natural world. He possesses an adventurous spirit and an iron will.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6QaQ-p8rsUuPzSULHxps_KMMXIXfTvF57qjrhD6vVy9WdPHozsBfuDxi9t2b2t7a7a20no1oiuoKwcOhavsX4IE7qryqQUntjRaGgJXO-PIqauY7Yh2_6KXR4oz6A9AFAdvYkHZ5Urymb51AxPBMG-X5cJjteHX67qbeF594zRdyUUmXOuEzhX_vREVR_ypTGXzGggx2GiLZJ52BEhXYYVqvefS-t1XSWKJMDcTJ30xMUpyVhIPrERBbLTzU498L4lI-LypZnpzw',
    nenCompatibility: [NenType.ENHANCER, NenType.EMITTER],
    needs: {
      environment: 'Rural / Near Nature',
      activities: 'High Physical Activity',
      pets: 'Animal Friendly',
      education: 'Flexible/Mentorship',
      // Fix: Add missing securityLevel property
      securityLevel: 1
    },
    verified: true
  },
  {
    id: '2',
    name: 'Killua',
    age: 12,
    region: 'Republic of Padokea',
    traits: ['Tech-Savvy', 'Loyal', 'Strategic', 'Cool-headed'],
    bio: 'A highly intelligent and skilled individual. Despite a complicated background, he seeks true friendship and a safe home environment where he can be himself.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_HAX70_I3eZs0NREPb85GW1GxCEvaFs-fN_iZtiXMJNk7Gpvrtnppif1o95yiw1P476r97WYT6DBY9Ui3VkxjXfFlhPP4W5XN_7MPhLQd_gNWxH3HP75zU73ZDMxEEmq3LUZqfDqj4JWPf8JdtyS9mU2yIC8euS6JFnuXLkClou6v2swae7efNRZcGjorskbaOUKLeoggi9p5fEJQAvISdy05LEPKwAeMaksWG3avX-bk4w7NWvYiJELcLzn3gRuPVDh14KEjDM',
    nenCompatibility: [NenType.TRANSMUTER, NenType.SPECIALIST],
    needs: {
      environment: 'Urban / Secure',
      activities: 'Mental Stimulation',
      pets: 'Allowed',
      education: 'Advanced/Private',
      // Fix: Add missing securityLevel property
      securityLevel: 4
    },
    verified: true
  },
  {
    id: '3',
    name: 'Killian',
    age: 7,
    region: 'Yorknew City',
    traits: ['Enthusiastic', 'Imaginative', 'Curious'],
    bio: 'A curious spirit who loves exploring nature and dreams of discovering unknown lands.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM2FLBo9T2cBb4bZMVQcY42VyyD9hZZsyK62cLRi3iDxtZfqKj2epgBYR2rPsGdkcYdborlRZ5RFQuR98mglQoDrayA3FLLEmW_Y7IORF2WDbWphinnxLxzufvdLvLN7PokXRtj2H6sC3Og9b89RzsUUvxr2VhWDCRPXisAEZNtAKSkzGoGaL1FvpmG1WCuryjykJWhLwaWmmxNntiheMAZkoQV1lB-V_ywqpRetIQxwtRqcPd2R6b3-gz4LjAHKvQs5W10RS0_kg',
    nenCompatibility: [NenType.CONJURER],
    needs: {
      environment: 'Quiet / Creative',
      activities: 'Low-Medium',
      pets: 'Small animals',
      education: 'Standard',
      // Fix: Add missing securityLevel property
      securityLevel: 1
    },
    verified: true
  }
];
