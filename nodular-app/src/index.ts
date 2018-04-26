import { Nodular } from 'nodular';
import { ServerModule } from 'nodular-server';
import { GetModule } from './app/get';

@Nodular([ServerModule, GetModule])
class Start {}