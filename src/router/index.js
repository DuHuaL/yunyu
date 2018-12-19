import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
import CapacityPre from '@/views/cloudPre/capacityPre';
import TrendPre from '@/views/cloudPre/trendPre';
import HotPre from '@/views/cloudPre/hotPre';
import FaultPre from '@/views/cloudPre/faultPre';
import AbnormalAna from '@/views/cloudAna/abnormalAna';
import BottleneckAna from '@/views/cloudAna/bottleneckAna';
import AssociationAna from '@/views/cloudAna/associationAna';
import Setting from '@/views/setting';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {name: 'capacityPre', path: 'capacityPre', component: CapacityPre},
        {name: 'trendPre', path: 'trendPre', component: TrendPre},
        {name: 'hotPre', path: 'hotPre', component: HotPre},
        {name: 'faultPre', path: 'faultPre', component: FaultPre},
        {name: 'abnormalAna', path: 'abnormalAna', component: AbnormalAna},
        {name: 'bottleneckAna', path: 'bottleneckAna', component: BottleneckAna},
        {name: 'associationAna', path: 'associationAna', component: AssociationAna},
        {name: 'setting', path: 'setting', component: Setting}
      ]
    }
  ]
});
