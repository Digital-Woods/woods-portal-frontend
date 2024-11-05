const Tickets = ({ path, objectId, id }) => {
  const hubspotObjectTypeId = objectId
  const title = "Ticket"
  const mediatorObjectTypeId = getParam("mediatorObjectTypeId")
  const mediatorObjectRecordId = getParam("mediatorObjectRecordId")
  const param =  mediatorObjectTypeId && mediatorObjectRecordId ? `?mediatorObjectTypeId=${mediatorObjectTypeId}&mediatorObjectRecordId=${mediatorObjectRecordId}` : ''

  let portalId;
  if (env.DATA_SOURCE_SET != true) {
    portalId = getPortal().portalId
  }
  const API_ENDPOINT = `/api/${portalId}/hubspot-object-tickets/${hubspotObjectTypeId}/${id}${param}`
// {portalId}/hubspot-object-tickets/{objectTypeId}/{objetRowId}
  return (
    <DashboardTable hubspotObjectTypeId={hubspotObjectTypeId} path={path} title={title} API_ENDPOINT={API_ENDPOINT} detailsView={false} />
  );
};
