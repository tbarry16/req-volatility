CREATE TABLE users (
	userID serial NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	CONSTRAINT users_pk PRIMARY KEY (userID)
)



CREATE TABLE user_with_feature (
	userID integer NOT NULL,
	featureID integer NOT NULL
)



CREATE TABLE features (
	featureID serial NOT NULL,
	featureName varchar(255) NOT NULL UNIQUE,
	featureDescription varchar,
	CONSTRAINT features_pk PRIMARY KEY (featureID)
)


CREATE TABLE requirements (
	reqID serial NOT NULL,
	featureID serial NOT NULL,
	reqName varchar(255) NOT NULL,
	reqDescription varchar NOT NULL,
	CONSTRAINT requirements_pk PRIMARY KEY (reqID)
)


ALTER TABLE user_with_feature ADD CONSTRAINT user_with_feature_fk0 FOREIGN KEY (userID) REFERENCES users(userID);
ALTER TABLE user_with_feature ADD CONSTRAINT user_with_feature_fk1 FOREIGN KEY (featureID) REFERENCES features(featureID);


ALTER TABLE requirements ADD CONSTRAINT requirements_fk1 FOREIGN KEY (featureID) REFERENCES features(featureID);




