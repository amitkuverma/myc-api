import cors from 'cors';
import config from '../config/config';

const corsOptions = {
  origin: config.corsOrigin,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

export default cors(corsOptions);
