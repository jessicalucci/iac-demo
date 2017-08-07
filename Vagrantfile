Vagrant.require_version ">= 1.9.2"

$vb_cpus = 2
$num_web_hosts = 2
$hosts = []
$webs = []

$hosts << {
    :name    => 'mysql',
    :cpu     => $vb_cpus,
    :mem     => 2048,
    :ip      => '10.40.40.100',
}
(1..$num_web_hosts).each do |i|
  ip_suffix = i + 1
  $hosts << {
  :name    => "web#{i}",
  :cpu     => $vb_cpus,
  :mem     => 2048,
  :ip      => "10.40.40.#{ip_suffix}",
  }
  $webs << "web#{i}"
end

File.new("roles/mysql/files/inserts.sql", "w")

Vagrant.configure("2") do |config|
  $hosts.each do |machine|
    config.vm.define machine[:name] do |node|
      node.vm.box = "bento/centos-7.3"
      node.vm.hostname = machine[:name]
      node.vm.network "private_network", ip: machine[:ip], :netmask => '255.255.255.0'
      if  machine[:name].include? "web"
        node.vm.network "forwarded_port", guest: 3000, host: (9001 + (machine[:name][-1]).to_i)
        open("roles/mysql/files/inserts.sql", "a") do |f|
          f.puts("INSERT INTO tbl_iacdb (host, visited, message) VALUES('#{machine[:ip]}', 0, 'hello from #{machine[:name]}!');")
        end
      end
      node.vm.provider "virtualbox" do |vb|
        vb.gui = false
        vb.customize ["modifyvm", :id, "--nictype1", "virtio"]
        vb.customize ["modifyvm", :id, "--nictype2", "virtio"]
        vb.customize ["modifyvm", :id, "--memory", machine[:mem]]
        vb.customize ["modifyvm", :id, "--cpus", machine[:cpu]]
        # https://www.mkwd.net/improve-vagrant-performance/
        vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
        vb.customize ["modifyvm", :id, "--ioapic", "on"]
      end
    end
  end

  config.ssh.insert_key = false
  config.vm.provision "ansible" do |ansible|
    ansible.verbose = "v"
    ansible.playbook = "playbook.yml"
    ansible.groups = {
        "database" => ["mysql"],
        "webservers" => $webs
    }
  end

end