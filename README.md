# `setup-ssh` GitHub Action


## Using the action

1. Create an SSH private key for your user. It's a good idea to generate a new key specifically for deployment (ideally on a specific deployment user with minimal permissions).
2. In your repository, go to the *Settings > Secrets* menu and create a new secret called `SSH_PRIVATE_KEY`. Put the *unencrypted private* SSH key into the contents field. <br>
  This key should start with `-----BEGIN RSA PRIVATE KEY-----`, consist of many lines and ends with `-----END RSA PRIVATE KEY-----`. 
  You can just copy the key as-is from the private key file.  
  _Note: This actions supports both standard keys & pem keys (the action will fix the formatting before loading them into the agent)._
3. Add another Secret called `SSH_KNOWN_HOSTS`, and paste the key fingerprint(s) of your server. You can find these using the following command `ssh-keyscan rsa -t <server IP>`.  
   **Disabling Host Check Checking (Not Recommended):**  
   You can disable strict host key checking by passing `ssh-disable-host-key-checking: true` to the action.
  
4. In your workflow definition file, add the following step. This should be after setting up php & installing composer dependencies.

```yaml
# .github/workflows/workflow.yml
jobs:
    job:
        ...
        steps:
            - actions/checkout@v1
            - uses: shivammathur/setup-php@master
                with:
                  php-version: 7.4
            - run: composer install
            - uses: LelineaITManufaktur/setup-ssh-action@master
              with:
                  ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
                  ssh-known-hosts: ${{ secrets.SSH_KNOWN_HOSTS }}
                  # To disable host key checking (insecure!):
                  ssh-disable-host-key-checking: true
            - ... other steps
```
