expect -c "
    set timeout 30
    spawn ssh root@$digital_ip 'bash -s' < ./deploy.sh
    expect ":"
    send \"$digital_pass\n\"
    interact
    "