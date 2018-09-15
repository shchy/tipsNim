echo $digital_ip
expect -c "
    set timeout 30
    spawn ssh root@$digital_ip 'bash -s' < ./deploy.sh
    expect ":"
    send \"yes\n\"
    
    expect "password:"
    send \"$digital_pass\n\"
    interact
    "
