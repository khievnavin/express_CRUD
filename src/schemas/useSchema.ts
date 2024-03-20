import z from 'zod'

const movieSchema = z.object({
   name : z.string().min(3),
   released_on : z.string().min(9),
});

export default movieSchema;