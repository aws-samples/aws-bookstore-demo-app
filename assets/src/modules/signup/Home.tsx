import React, { Component } from "react";
import screenshot from "../../images/screenshot.png";
import yourpastorders from "../../images/yourpastorders.png";
import bestSellers from "../../images/bestSellers.png";
import yourshoppingcart from "../../images/yourshoppingcart.png";
import { Hero } from "../../common/hero/Hero";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { BestSellersBar } from "../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGalleryTeaser } from "../category/CategoryGalleryTeaser";
import { FriendsBought } from "../friends/FriendsBought";
import { LinkContainer } from "react-router-bootstrap";
import "./home.css";

interface HomeProps {
  isAuthenticated: boolean;
}

interface HomeState {
  isLoading: boolean;
}

export default class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    this.setState({ isLoading: false });
  }

  renderLanding() {
    return (
      <div className="lander">
        <h1>Bookstore Demo</h1>
        <hr />
        <p>This is a sample application demonstrating how different types of databases and AWS services can work together to deliver a delightful user experience.  In this bookstore demo, users can browse and search for books, view recommendations, see the leaderboard, view past orders, and more.  You can get this sample application up and running in your own environment and learn more about the architecture of the app by looking at the <a href="https://github.com/aws-samples/aws-bookstore-demo-app" target="_blank">github repository</a>.</p>
        <div className="button-container col-md-12">
          <LinkContainer to="/signup">
          <a href="/signup">Sign up to explore the demo</a>
          </LinkContainer>
        </div>
        <img src={screenshot} className="img-fluid full-width" alt="Screenshot"></img>
        <div className="product-section">
          <h1>Databases on AWS</h1>
          <hr />
          <h2>Purpose-built databases for all your application needs</h2>
          <div className="col-md-12">
            <p>As the cloud continues to drive down the cost of storage and compute, a new generation of applications have emerged, creating a new set of requirements for databases. These applications need databases to store terabytes to petabytes of new types of data, provide access to the data with millisecond latency, process millions of requests per second, and scale to support millions of users anywhere in the world. To support these requirements, you need both relational and non-relational databases that are purpose-built to handle the specific needs of your applications. AWS offers the broadest range of databases purpose-built for your specific application use cases. </p>
          </div>
        </div>

        <div className="product-section">
          <div className="col-md-12">
            <hr />
            <h3><a href="https://aws.amazon.com/dynamodb/">Amazon DynamoDB</a></h3>
            <h4>NoSQL Database</h4>
            <p><a href="https://aws.amazon.com/dynamodb/">Amazon DynamoDB</a> is a fast and flexible <a href="https://aws.amazon.com/nosql/">NoSQL database service</a> for all applications that need consistent, single-digit millisecond latency at any scale. It is a fully managed cloud database and supports both document and key-value store models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad tech, IoT, and many other applications. New for DynamoDB is global tables, which fully automate the replication of tables across AWS regions for a fully managed, multi-master, multi-region database. DynamoDB also adds support for on-demand and continuous backups for native data protection.</p>
            <p>For more information visit the <a href="https://aws.amazon.com/dynamodb/">Amazon DynamoDB product page.</a></p>
          </div>
          <div className="col-md-12">
            <hr />
            <h3><a href="https://aws.amazon.com/neptune/">Amazon Neptune</a></h3>
            <h4>Graph Database</h4>
            <p><a href="https://aws.amazon.com/neptune/">Amazon Neptune</a> is a fast, reliable, fully-managed <a href="https://aws.amazon.com/nosql/graph/">graph database</a> service that makes it easy to build and run applications that work with highly connected datasets. The core of Amazon Neptune is a purpose-built, high-performance graph database engine optimized for storing billions of relationships and querying the graph with milliseconds latency. Amazon Neptune supports popular graph models Apache TinkerPop and W3C's RDF, and their associated query languages TinkerPop Gremlin and RDF SPARQL, allowing you to easily build queries that efficiently navigate highly connected datasets. Neptune powers graph use cases such as recommendation engines, fraud detection, knowledge graphs, drug discovery, and network security.</p>
            <p>For more information visit the <a href="https://aws.amazon.com/neptune/">Amazon Neptune product page.</a></p>
          </div>
          <div className="col-md-12">
            <hr />
            <h3><a href="https://aws.amazon.com/elasticache/">Amazon ElastiCache</a></h3>
            <h4>In-Memory Data Store</h4>
            <p><a href="https://aws.amazon.com/elasticache/">Amazon ElastiCache</a> makes it easy to deploy, operate, and scale an <a href="https://aws.amazon.com/nosql/key-value/">in-memory data store</a> or cache in the cloud. The service improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases. ElastiCache for Redis offers fully managed Redis and ElastiCache for Memcached offers fully managed <a href="https://aws.amazon.com/memcached/">Memcached</a>in the cloud.</p>
            <p>For more information visit the  <a href="https://aws.amazon.com/elasticache/">Amazon ElastiCache product page.</a></p>
          </div>
          
          <div className="col-md-12">
            <hr />
            <h3><a href="https://aws.amazon.com/elasticsearch-service/">Amazon Elasticsearch Service</a></h3>
            <h4>Fully managed, scalable, and reliable Elasticsearch service</h4>
            <p><a href="https://aws.amazon.com/elasticsearch-service/">Amazon Elasticsearch Service</a> is a fully managed service that makes it easy for you to deploy, secure, operate, and scale Elasticsearch to search, analyze, and visualize data in real-time. With Amazon Elasticsearch Service you get easy-to-use APIs and real-time analytics capabilities to power use-cases such as log analytics, full-text search, application monitoring, and clickstream analytics, with enterprise-grade availability, scalability, and security. The service offers integrations with open-source tools like Kibana and Logstash for data ingestion and visualization. It also integrates seamlessly with other AWS services such as Amazon Virtual Private Cloud (VPC), AWS Key Management Service (KMS), Amazon Kinesis Data Firehose, AWS Lambda, AWS Identity and Access Management Service (IAM), Amazon Cognito, and Amazon CloudWatch, so you can go from data to actionable insights quickly and securely.</p>
            <p>For more information visit the <a href="https://aws.amazon.com/elasticsearch-service/">Amazon Elasticsearch Service product page.</a></p>
        </div>
      </div>
    </div>);
  }

  renderHome() {
    return (
      <div className="bookstore">
        <Hero />
        <SearchBar />
        <CategoryNavBar />
        <BestSellersBar />
        <div className="well-bs col-md-12 ad-container-padding">
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/past">
                <img src={yourpastorders} alt="Past orders"></img> 
              </LinkContainer>
            </div>
          </div>
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/cart">
                <img src={yourshoppingcart} alt="Shopping cart"></img> 
              </LinkContainer>
            </div>
          </div>
          <div className="col-md-4 ad-padding">
            <div className="container-category no-padding">
              <LinkContainer to="/best">
                <img src={bestSellers} alt="Best sellers"></img> 
              </LinkContainer>
            </div>
          </div>
        </div>
        <CategoryGalleryTeaser />
        <FriendsBought />
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHome() : this.renderLanding()}
      </div>
    );
  }
}