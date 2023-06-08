import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

// create the connection
const connection = connect({
  url: "mysql://e88v1srzz3i7p5wcc3hj:************@aws.connect.psdb.cloud:54089/timesink-presents?sslaccept=strict",
});

export const db = drizzle(connection);
