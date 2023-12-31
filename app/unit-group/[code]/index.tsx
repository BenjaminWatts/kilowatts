import React, { useState, useEffect, useMemo } from 'react';
import log from '../../../services/log';
import { UnitGroupLive } from '../../../components/UnitGroupLive';
import { SmartAppBanner } from '../../../components/SmartAppBanner.web';
import { lookups, urls } from '../../../services/nav';
import { useLocalSearchParams } from 'expo-router';
import { MixScheduleCard, UnknownUnitGroupCode } from '../../../atoms/cards';
import { UnitGroupChart } from '../../../components/UnitGroupChart';

export const UnitGroupScreen = React.memo(() => {

  log.info('UnitGroupScreen');
  const params = useLocalSearchParams<{ code: string }>();
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (params.code && params.code !== code) {
      setCode(params.code);
    }
  }, [params.code, code]);

  const unitGroup = useMemo(() => lookups.unitGroup(code as string), [code]);

  if (!code || !unitGroup) {
    return <UnknownUnitGroupCode />;
  }

  log.debug(`UnitGroupScreen: Found unitGroup ${unitGroup.details.name}`);

  const bmUnits = unitGroup.units.map((u) => u.bmUnit);
  return (
    <>
      {unitGroup.details.code && (
        <SmartAppBanner url={urls.unitGroup(unitGroup.details.code)} />
      )}
      <UnitGroupLive ug={unitGroup} />
      <MixScheduleCard/>
      <UnitGroupChart bmUnits={bmUnits} />
    </>
  );
});

export default UnitGroupScreen;
