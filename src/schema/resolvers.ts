const resolvers = {
  Query: {
    persons: () => persons,
  },
};

const persons = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
  },
];

export default resolvers;
