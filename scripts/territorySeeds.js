module.exports = function(db) {
  db.Territory.create({territoryName:  'Northwest', countryCode: 'US',  territoryGroup: 'North America', sortOrder: '1', isActive: '1'});
  db.Territory.create({territoryName:  'Northeast', countryCode: 'US',  territoryGroup: 'North America', sortOrder: '2', isActive: '1'});
  db.Territory.create({territoryName:  'Central', countryCode: 'US',  territoryGroup: 'North America', sortOrder: '3', isActive: '1'});
  db.Territory.create({territoryName:  'Southwest', countryCode: 'US',  territoryGroup: 'North America', sortOrder: '4', isActive: '1'});
  db.Territory.create({territoryName:  'Southeast', countryCode: 'US',  territoryGroup: 'North America', sortOrder: '5', isActive: '1'});
  db.Territory.create({territoryName:  'Canada', countryCode: 'CA',  territoryGroup: 'North America', sortOrder: '6', isActive: '1'});
  db.Territory.create({territoryName:  'France', countryCode: 'FR',  territoryGroup: 'Europe', sortOrder: '7', isActive: '1'});
  db.Territory.create({territoryName:  'Germany', countryCode: 'DE',  territoryGroup: 'Europe', sortOrder: '8', isActive: '1'});
  db.Territory.create({territoryName:  'Australia', countryCode: 'AU',  territoryGroup: 'Pacific', sortOrder: '9', isActive: '1'});
  db.Territory.create({territoryName:  'United Kingdom', countryCode: 'GB',  territoryGroup: 'Europe', sortOrder: '10', isActive: '1'});
};