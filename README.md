# MicroMobile

Backend code for: MicroMobile: Leveraging Mobile Advertising for Large-Scale Experimentation.  Mark D. Corner and Brian N. Levine. In Proceedings of the 16th ACM International Conference on Mobile Systems, Applications, and Services (MobiSys), Munich, Germany, June 2018.

# Installation

## Development setup
  cp config/config.json.sample to config/config.json (AND CONFIGURE CORRECTLY)
  npm install
  createdb micromobile_dev
  node_modules/.bin/sequelize db:migrate

## Setup AWS (TODO)

### API Gateway and Lambda

  Need to document how to hook API Gateway to lambda functions

### IAM Setup

Need an IAM role that can access backend bucket and log:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:Put*",
            "Resource": [
                "arn:aws:s3:::micromobile-backend/experiment-results/*"
            ]
        },
         {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}
```

### S3 Setup

* Two buckets:

First bucket for backend, such as "micromobile-backend".  Arn for this goes into config.json

Second for web deployment.


* CORS settings

```
<!-- Sample policy -->
<CORSConfiguration>
	<CORSRule>
		<AllowedOrigin>*</AllowedOrigin>
		<AllowedMethod>GET</AllowedMethod>
		<MaxAgeSeconds>3000</MaxAgeSeconds>
		<AllowedHeader>Authorization</AllowedHeader>
	</CORSRule>
</CORSConfiguration>
```

### Cloudfront
 * Change default cache settings
 * Whitelist headers: Origin,Access-Control-Request-Headers,Access-Control-Request-Method

# Deploy

  NODE_ENV=production node_modules/.bin/sequelize db:migrate
  ./deploy_backend.sh
