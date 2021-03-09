import { routes as auth } from '@/views/auth';
import { routes as cte } from '@/views/cte';
import { routes as demo } from '@/pages/demo';

export default [...auth, ...cte, ...demo];
